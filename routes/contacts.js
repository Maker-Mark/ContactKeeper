const express = require("express");
const router = express.Router(); //Get express' router

//POST:Submitting some data/adding contact
//GET:Fetch/getting data
//PUT: Update something
//DELETE: Remove something

//Registering user--> Use a put req

// @ route      GET api/contacts
// @desc        Get all that users' contacts
// @access      Private (you need to be logged in to do this)
router.get("/", (req, res) => {
  res.send("Gets all contacts");
}); //Note that "/" here refers to the prefix of "api/users" + "/"

//We can have the same request paths for two different methods!
// @ route      POST api/contacts
// @desc        Add a new contact
// @access      Private
router.post("/", (req, res) => {
  res.send("Added a contact");
}); //Note that "/" here refers to the prefix of "api/contacts" + "/"

//We can have the same request paths for two different methods!
// @ route      PUT api/contacts
// @desc        Update a contact
// @access      Private
router.put("/:id", (req, res) => {
  res.send("Added a contact"); // the ":id" is a placeholder
}); //Note that "/" here refers to the prefix of "api/contacts" + "/"

//We can have the same request paths for two different methods!
// @ route      DELETE api/contacts
// @desc        Delete a contact
// @access      Private
router.delete("/:id", (req, res) => {
  res.send("Deleted a contact"); // the ":id" is a placeholder
}); //Note that "/" here refers to the prefix of "api/contacts" + "/"

module.exports = router;
