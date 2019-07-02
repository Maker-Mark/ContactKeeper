const express = require("express");
const router = express.Router(); //Get express' router

//POST:Submitting some data/adding contact
//GET:Fetch/getting data
//PUT: Update something
//DELETE: Remove something

//Registering user--> Use a put req

// @ route      GET api/auth
// @desc        Get a logged in user
// @access      Private
router.get("/", (req, res) => {
  res.send("Got a  user");
}); //Note that "/" here refers to the prefix of "api/users" + "/"

//We can have the same request paths for two different methods!
// @ route      POST api/auth
// @desc        Auth user and get Token
// @access      Public
router.post("/", (req, res) => {
  res.send("Log in  user");
}); //Note that "/" here refers to the prefix of "api/users" + "/"

module.exports = router;
