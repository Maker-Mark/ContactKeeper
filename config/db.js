const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

//Mongoose returns promises, let's use async await and try-catch
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    }); //If we get though the await, do this stuff below me
    console.log("MongoDB connected!");
    //Otherwise catch the  error exit the process.
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
