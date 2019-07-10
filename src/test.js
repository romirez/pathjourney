const rp = require('request-promise');
const convert = require("xml-js");
const firebase = require('firebase-admin');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "***REMOVED***",
    authDomain: "pathjourney-sypath.firebaseapp.com",
    databaseURL: "https://pathjourney-sypath.firebaseio.com",
    projectId: "pathjourney-sypath",
    storageBucket: "pathjourney-sypath.appspot.com",
    messagingSenderId: "1047338707072",
    appId: "1:1047338707072:web:b65cb26cc20c8e8a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
firestore.settings({timestampsInSnapshots: true});

rp('https://api.vesselfinder.com/vesselslist?userkey=***REMOVED***&format=xml')
.then(response => {
    var data = convert.xml2js(response);
    var obj = data.elements[0].elements[0].elements[0].attributes;
    var id = new Date(obj.TIMESTAMP).getTime();
    console.log(JSON.stringify(obj));
    var record = {
        location: new firebase.firestore.GeoPoint(parseFloat(obj.LATITUDE), parseFloat(obj.LONGITUDE)),
        course: parseInt(obj.COURSE),
        speed: parseInt(obj.SPEED)
    }
    if (obj.HEADING != "511") record.heading = parseInt(obj.HEADING);
    firestore.collection("coordinates").doc(id).set(record);
})




