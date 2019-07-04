const express = require("express");
const router = express.Router(); //Get express' router
const User = require("../models/User");
const { check, validationResult } = require("express-validator/check");
const auth = require("../middleware/auth");
const Contact = require("../models/Contact");

//POST:Submitting some data/adding contact
//GET:Fetch/getting data
//PUT: Update something
//DELETE: Remove something

//Registering user--> Use a put req

// @ route      GET api/contacts
// @desc        Get all that users' contacts
// @access      Private (you need to be logged in to do this)
//Adding the auth middleware makes this protected
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    }); //Get us the contact array fort his user from most recent
    res.json(contacts); //Send the json of contacts
  } catch (err) {
    console.error(err.message);
    res.status("SERVER ERROR");
  }
}); //Note that "/" here refers to the prefix of "api/users" + "/"

//We can have the same request paths for two different methods!
// @ route      POST api/contacts
// @desc        Add a new contact
// @access      Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required to make a contact")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //If the requirements were NOT met
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      }); //Send a error code and an array of the errors
    }
    //Pull out the data
    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("SERVER ERROR");
    }
  }
); //Note that "/" here refers to the prefix of "api/contacts" + "/"

//We can have the same request paths for two different methods!
// @ route      PUT api/contacts
// @desc        Update a contact
// @access      Private
router.put("/:id", auth, async (req, res) => {
  // the ":id" is a placeholder
  //Pull out the data
  const { name, email, phone, type } = req.body;

  //Build a contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;
  console.log("Im here");
  try {
    //Find the contact by id
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });
    //Make sure user owns this contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "You're not authorized for this." });
    }
    //Do the update
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json({ contact });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("SERVER ERROR");
  }
}); //Note that "/" here refers to the prefix of "api/contacts" + "/"

//We can have the same request paths for two different methods!
// @ route      DELETE api/contacts
// @desc        Delete a contact
// @access      Private
router.delete("/:id", auth, async (req, res) => {
  console.log("Im here");
  try {
    //Find the contact by id
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });
    //Make sure user owns this contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "You're not authorized for this." });
    }
    //Delete the contact
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: "Contact Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("SERVER ERROR");
  }
}); //Note that "/" here refers to the prefix of "api/contacts" + "/"

module.exports = router;
