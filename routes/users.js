const express = require("express");
const router = express.Router(); //Get express' router
const User = require("../models/User");
const { check, validationResult } = require("express-validator/check");
//POST:Submitting some data/adding contact
//GET:Fetch/getting data
//PUT: Update something
//DELETE: Remove something

//Registering user--> Use a put req

// @ route      POST api/users
// @desc        Register a user
// @access      Public
//Add validation using express validator //Checks: (FIELD, MESSAGE, condition) If it's NOT NOT Empty (Two F --> True, meaning it is empty(tnx discrete math)) post the message
router.post(
  "/",
  [
    check("name", "Please add a name")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    //If the requirements were NOT met
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //Send a error code and an array of the errors
    }
    res.send("Passed");
  }
); //Note that "/" here refers to the prefix of "api/users" + "/"

module.exports = router;
