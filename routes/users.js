const express = require("express");
const router = express.Router(); //Get express' router

//POST:Submitting some data/adding contact
//GET:Fetch/getting data
//PUT: Update something
//DELETE: Remove something

//Registering user--> Use a put req

// @ route      POST api/users
// @desc        Register a user
// @access      Public
router.post("/", (req, res) => {
  res.send("Registered a new user");
}); //Note that "/" here refers to the prefix of "api/users" + "/"

module.exports = router;
