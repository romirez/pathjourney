const rp = require('request-promise');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const geolib = require('geolib');

const os = require('os');
const path = require("path");

const sharp = require('sharp');
const fs = require('fs-extra');

admin.initializeApp();

exports.scheduledVesselFinderImport =
    functions.pubsub.schedule('every 60 minutes').onRun((context) => {
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
        const tmpFilePath = path.join(workingDir, 'source.png');

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
            const thumbName = `thumb@${size}_${fileName}`;
            const thumbPath = path.join(workingDir, thumbName);

            // Resize source image
            await sharp(tmpFilePath)
                .resize(size, size)
                .toFile(thumbPath);

            // Upload to GCS
            return bucket.upload(thumbPath, {
                destination: path.join(bucketDir, thumbName)
            });
        });

        // 4. Run the upload operations
        await Promise.all(uploadPromises);

        // 5. Cleanup remove the tmp/thumbs from the filesystem
        return fs.remove(workingDir);
    });

