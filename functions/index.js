const rp = require('request-promise');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const geolib = require('geolib');

const os = require('os');
const path = require("path");

const sharp = require('sharp');
const fs = require('fs-extra');
const UUID = require("uuid-v4");


admin.initializeApp();

exports.scheduledVesselFinderImport =
    functions.pubsub.schedule('every 16 minutes').onRun((context) => {
        console.log("Getting position")
        var options = {
            uri: 'https://api.vesselfinder.com/vesselslist?userkey=***REMOVED***&format=json',
            json: true // Automatically stringifies the body to JSON
        };
        return rp(options)
            .then(resp => {
                var db = admin.firestore();
                console.log(JSON.stringify(resp));
                if (resp.error != null) {
                    console.log("error: " + resp.error);
                    return;
                }
                var obj = resp[0].AIS;
                var id = new Date(obj.TIMESTAMP).getTime().toString();
                var record = {
                    location: new admin.firestore.GeoPoint(parseFloat(obj.LATITUDE), parseFloat(obj.LONGITUDE)),
                    course: parseInt(obj.COURSE),
                    speed: parseInt(obj.SPEED),
                    time: new Date(obj.TIMESTAMP),
                    source: "AIS"
                }
                if (obj.HEADING != "511") record.heading = obj.HEADING;

                var doc = db.collection("coordinates").doc(id);
                if (!doc.exists) {
                    console.log("New coordinates!");

                    return db.collection("coordinates").orderBy("time", 'desc').limit(1).get().then((res1) => {
                        var last = res1.docs[0].data();

                        var dist = geolib.getDistance(
                            { latitude: last["location"].latitude, longitude: last["location"].longitude },
                            { latitude: obj.LATITUDE, longitude: obj.LONGITUDE }
                        );
                        if (dist > 50) {
                            console.log("new location is far from last location: " + dist + "m, adding");
                            return db.collection("coordinates").doc(id).set(record);
                        } else {
                            console.log("new location is close to last location: " + dist + "m, ignoring");
                            return;
                        }
                    })
                } else {
                    console.log("Coordinates already recorded, updating");
                    return db.collection("coordinates").doc(id).set(record);
                }
            }).catch(function (err) {
                console.error(err);
            });
    });

exports.scheduledKVHImport =
    functions.pubsub.schedule('every 15 minutes').onRun((context) => {
        console.log("Getting position")
        var options = {
            uri: 'http://app.mykvh.com/api/v1/platform/positioning/***REMOVED***/latest.csv'
        };
        return rp(options)
            .then(resp => {
                var db = admin.firestore();
                if (resp.error != null) {
                    console.log("error: " + resp.error);
                    return;
                }
                var obj = resp.split("\n")[1].split(",");
                var time = new Date(obj[0] + "Z")
                var id = time.toString();
                var record = {
                    location: new admin.firestore.GeoPoint(parseFloat(obj[7]), parseFloat(obj[8])),
                    time: time,
                    source: "KVH"
                }
                console.log(JSON.stringify(record));

                var doc = db.collection("coordinates").doc(id);
                if (!doc.exists) {
                    console.log("New coordinates!");

                    return db.collection("coordinates").where('time', '<', time).orderBy("time", 'desc').limit(1).get().then((res1) => {
                        return db.collection("coordinates").where('time', '>', time).orderBy("time", 'asc').limit(1).get().then((res2) => {
                            var dist = 999999999999;
                            if (res1.docs.length != 0) {
                                var last = res1.docs[0].data();

                                var dist1 = geolib.getDistance(
                                    { latitude: last["location"].latitude, longitude: last["location"].longitude },
                                    { latitude: parseFloat(obj[7]), longitude: parseFloat(obj[8]) }
                                );
                                if (dist1 < dist) dist = dist1;
                            }
                            if (res2.docs.length != 0) {
                                var last = res2.docs[0].data();

                                var dist1 = geolib.getDistance(
                                    { latitude: last["location"].latitude, longitude: last["location"].longitude },
                                    { latitude: parseFloat(obj[7]), longitude: parseFloat(obj[8]) }
                                );
                                if (dist1 < dist) dist = dist1;
                            }
                            if (dist > 50) {
                                console.log("new location is far from closest location: " + dist + "m, adding");
                                return db.collection("coordinates").doc(id).set(record);
                            } else {
                                console.log("new location is close to closest location: " + dist + "m, ignoring");
                                return;
                            }
                        });
                    });
                } else {
                    console.log("Coordinates already recorded, updating");
                    return db.collection("coordinates").doc(id).set(record);
                }
            }).catch(function (err) {
                console.error(err);
            });
    });

exports.cleanDrafts =
    functions.pubsub.schedule('every 24 hours').onRun((context) => {
        var db = admin.firestore();

        var date = new Date();
        let batch = db.batch();
        var num = 0;
        console.log("deleting drafts..")

        db.collection("journeylogs").where("draft", "==", true).where("add_time", "<", new Date(date.getFullYear(), date.getMonth(), date.getDay() - 1)).get().then(r => {
            r.forEach(doc => {
                batch.delete(doc.ref);
                num += 1;
            })
        })
        return batch.commit().then(() => {
            console.log("deleted " + num + " drafts");
        });

    });

exports.vesselFinderImport = functions.https.onRequest((req, res) => {
    console.log("Getting position")
    var options = {
        uri: 'https://api.vesselfinder.com/vesselslist?userkey=***REMOVED***&format=json',
        json: true // Automatically stringifies the body to JSON
    };
    return rp(options)
        .then(resp => {
            var db = admin.firestore();
            if (resp.error != null) {
                console.log("error: " + resp.error);
                res.status(200).send("Failure! " + resp.error);
                return;
            }
            console.log(JSON.stringify(resp));
            var obj = resp[0].AIS;
            var id = new Date(obj.TIMESTAMP).getTime().toString();
            var record = {
                location: new admin.firestore.GeoPoint(parseFloat(obj.LATITUDE), parseFloat(obj.LONGITUDE)),
                course: parseInt(obj.COURSE),
                speed: parseInt(obj.SPEED),
                time: new Date(obj.TIMESTAMP),
                source: "AIS"
            }
            if (obj.HEADING != "511") record.heading = obj.HEADING;
            console.log("checking db");
            var doc = db.collection("coordinates").doc(id);
            console.log("doc = " + doc.exists);
            if (!doc.exists) {
                console.log("New coordinates!");

                return db.collection("coordinates").orderBy("time", 'desc').limit(1).get().then((res1) => {
                    var last = res1.docs[0].data();
                    console.log(JSON.stringify(last));

                    var dist = geolib.getDistance(
                        { latitude: last["location"].latitude, longitude: last["location"].longitude },
                        { latitude: obj.LATITUDE, longitude: obj.LONGITUDE }
                    );
                    if (dist > 50) {
                        console.log("new location is far from last location: " + dist + "m, adding");
                        return db.collection("coordinates").doc(id).set(record).then(function () {
                            res.status(200).send("Success!");
                            return;
                        });
                    } else {
                        console.log("new location is close to last location: " + dist + "m, ignoring");
                        res.status(200).send("Success!");
                        return;
                    }
                })
            } else {
                console.log("Coordinates already recorded, updating");
                return db.collection("coordinates").doc(id).set(record);
            }
        }).catch(function (err) {
            console.error(err);
            res.status(200).send("Failure! \n" + err);
        });
});

exports.generateThumbs = functions.storage
    .object()
    .onFinalize(async object => {
        const storage = admin.storage();
        const bucket = storage.bucket(object.bucket);
        const filePath = object.name;
        const fileName = filePath.split('/').pop();
        const bucketDir = path.dirname(filePath);

        const workingDir = path.join(os.tmpdir(), 'thumbs');
        const tmpFilePath = path.join(workingDir, fileName + '.png');

        if (fileName.includes('thumb@') || !object.contentType.includes('image')) {
            console.log('exiting function');
            return false;
        }

        // 1. Ensure thumbnail dir exists
        await fs.ensureDir(workingDir);

        // 2. Download Source File
        await bucket.file(filePath).download({
            destination: tmpFilePath
        });

        // 3. Resize the images and define an array of upload promises
        const sizes = [60, 256];

        const uploadPromises = sizes.map(async size => {
            const thumbName = `${fileName}_thumb@${size}`;
            const thumbPath = path.join(workingDir, thumbName);

            // Resize source image
            await sharp(tmpFilePath)
                .resize(size, size)
                .jpeg()
                .toFile(thumbPath);

            uuid = UUID();

            // Upload to GCS
            return bucket.upload(thumbPath, {
                destination: path.join(bucketDir, thumbName),
                metadata: {
                    contentType: 'image/jpeg',
                    metadata: {
                        firebaseStorageDownloadTokens: uuid
                    }
                }
            }).then((data) => {
                var db = admin.firestore();
                file = data[0];
                if (size == 60) {
                    db.collection("photos").doc(fileName).update({ thumburl: "https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(file.name) + "?alt=media&token=" + uuid });
                } else if (size == 256) {
                    db.collection("photos").doc(fileName).update({ thumb256url: "https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(file.name) + "?alt=media&token=" + uuid });
                }
            });
        });

        // 4. Run the upload operations
        await Promise.all(uploadPromises);

        // 5. Cleanup remove the tmp/thumbs from the filesystem
        return fs.remove(tmpFilePath).then(() => {
            return fs.remove(workingDir);
        });
    });

