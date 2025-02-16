const mongoose = require("mongoose");

const connecToDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log("db connection error", err);
    });
};

module.exports = connecToDB;
