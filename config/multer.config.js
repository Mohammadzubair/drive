const multer = require("multer");
const multerFirebaseStorage = require("multer-firebase-storage");
const firebaseAdmin = require("./firebase.config.js");
const serviceAccount = require("../drive-9240e-firebase-adminsdk-fbsvc-807bddd5f5.json");

const storage = multerFirebaseStorage({
  credentials: firebaseAdmin.credential.cert(serviceAccount),
  bucketName: "drive-9240e.appspot.com",
  unique: true,
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
