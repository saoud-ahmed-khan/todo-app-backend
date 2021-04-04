const express = require("express");
const morgan = require("morgan");
const { dbConnect } = require("./database/index");
const path = require("path");
const app = express();


require("dotenv").config({
  path:
    process.env.NODE_ENV === "development"
      ? path.resolve(".env.development")
      : path.resolve(".env"),
});

app.use(express.json({ extended: false }));
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.status(200).send({ success: true, message: "you are in root directory" });
});
app.use("/api/v1", require("./routes/index"));
const PORT = 5000 || process.env.PORT;

dbConnect();
app.listen(PORT, () => {
  console.log(`your app is running on PORT ${PORT}`);
});
