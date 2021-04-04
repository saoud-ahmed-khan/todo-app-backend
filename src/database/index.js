const mongoose = require("mongoose");
const { config } = require("../Config");
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.M0NGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false, 
      useCreateIndex: true,
    });
    console.log("mongo db connected successfully");
  } catch (e) {
    console.log(`unable to connect: ${e.message}`);
  }
};
exports.dbConnect = dbConnect;
