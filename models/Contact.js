const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  //The contact has a users
  //The type is from users
  user: {
    //Take the ObjectId that we get from the bd
    type: mongoose.Schema.Types.ObjectId,
    ref: "users" //Refer to the collection, in this case: Users
  },
  //Contact stores
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  type: {
    type: String,
    default: "personal"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("contact", ContactSchema);
