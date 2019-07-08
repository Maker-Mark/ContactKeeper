const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
const db1 = config.get("mongoURI1");
// const db = "mongodb://127.0.0.1:27017/music";

// Mongoose returns promises, let's use async await and try-catch
const connectDB = async () => {
  try {
    await mongoose.connect(db || db1, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message + "Went bad here");
    // connectDB();
    process.exit(1);
  }
};

// //Use this retry method if you are getting connection failed on first connect.
// const connectWithRetry = function() {
//   return mongoose.connect(db, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   });
// };
// //  = connectWithRetry;

//Until here

module.exports = connectDB;
