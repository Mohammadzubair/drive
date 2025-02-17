const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("../drive-9240e-firebase-adminsdk-fbsvc-807bddd5f5.json");

const firebaseApp = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  storageBucket: "drive-9240e.appspot.com",
});

module.exports = firebaseAdmin;
