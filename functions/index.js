const rp = require('request-promise');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const geolib = require('geolib');

admin.initializeApp();

exports.scheduledVesselFinderImport =
    functions.pubsub.schedule('every 30 minutes').onRun((context) => {
        console.log("Getting position")
        var options = {
            uri: 'https://api.vesselfinder.com/vesselslist?userkey=***REMOVED***&format=json',
            json: true // Automatically stringifies the body to JSON
        };
        return rp(options)
            .then(resp => {
                var dbg = "";
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
                    time: new Date(obj.TIMESTAMP)
                }
                if (obj.HEADING != "511") record.heading = obj.HEADING;

                console.log("checking db");
                var doc = db.collection("coordinates").doc(id);
                console.log("doc = " + doc.exists);
                dbg += "doc = " + doc.exists + "\n" + "id=" + id + "\n";
                if (!doc.exists) {
                    console.log("New coordinates!");

                    var last = db.collection("coordinates").orderBy("time", direction = firestore.Query.DESCENDING).data();
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
            var dbg = "";
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
                time: new Date(obj.TIMESTAMP)
            }
            if (obj.HEADING != "511") record.heading = obj.HEADING;
            console.log("checking db");
            var doc = db.collection("coordinates").doc(id);
            console.log("doc = " + doc.exists);
            dbg += "doc = " + doc.exists + "\n" + "id=" + id + "\n";
            if (!doc.exists) {
                console.log("New coordinates!");

                var last = db.collection("coordinates").orderBy("time", direction = firestore.Query.DESCENDING).data();
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
            } else {
                console.log("Coordinates already recorded, updating");
                return db.collection("coordinates").doc(id).set(record);
            }
            return db.collection("coordinates").doc(id).set(record).then(function () { res.status(200).send(dbg + "\n" + "Success!"); });
        }).catch(function (err) {
            console.error(err);
            res.status(200).send("Failure! \n" + err);
        });
});
