const express = require("express");
const PORT = 3000;
const userRouter = require("./routes/user.routes");
const dotenv = require("dotenv");
dotenv.config();
const connectToDB = require("./config/db");
connectToDB();
const cookieParser = require("cookie-parser");
const app = express();

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
