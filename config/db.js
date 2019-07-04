const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
// const db = "mongodb://127.0.0.1:27017/music";

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
  } catch (err) {
    console.error(err.message + "Went bad here");
    process.exit(1);
  }
};

// //Use this retry method if you are getting connection failed on first connect.
// var connectWithRetry = function () {
//   return mongoose.connect(db, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   });

// };
// connectDB = connectWithRetry;

// //Until here

module.exports = connectDB;
