const express = require("express");
const router = express.Router(); //Get express' router
const User = require("../models/User");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//Middleware
const auth = require("../middleware/auth");

//POST:Submitting some data/adding contact
//GET:Fetch/getting data
//PUT: Update something
//DELETE: Remove something
//---------------------------------
//Registering user--> Use a put req
// @ route      GET api/auth
// @desc        Get a logged in user
// @access      Private
//Anything we need to protect a route, we just need to use our middleware...
//We EXLUDE the password
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}); //Note that "/" here refers to the prefix of "api/users" + "/"

//We can have the same request paths for two different methods!
// @ route      POST api/auth
// @desc        Auth user and get Token
// @access      Public
// We want to make sure that a email and password is sent
router.post(
  "/",
  [
    check("email", "Please include a valid email"), //Check we got an email
    check("password", "Password is required").exists() //Check we have a pw
  ],
  async (req, res) => {
    //This is from express-validator and returns the errors from the checks given the request
    const errors = validationResult(req);
    //If the requirements were NOT met
    if (!errors.isEmpty()) {
      //Return a status of 400 and an array of the errors
      return res.status(400).json({
        errors: errors.array()
      });
    }

    //If no errors were found(meaning we got a email and pw)
    const { email, password } = req.body; //Destructure the request's data

    //See if it's valid and see if we can hash it and login
    try {
      //Use the User model's method findOne to check if the email is actually registered
      let user = await User.findOne({
        email
      });
      if (!user) {
        return res.status(400).json({
          msg: "Email not registered!"
        });
      }

      //If the email exits, let's check the password via a bcrypt.compare hashing
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          msg: "Incorrect password!"
        });
      }

      //If the pw is correct give this payload for jwt
      const payload = {
        user: {
          id: user.id
        }
      };
      //jwt takes: Sign, payload, options, and a call back
      //When it expires they'll have to log back in
      jwt.sign(
        //Sign the jwt with the payload given the secret and set it to expire.
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 46000
        }, //res.json the token as a object
        (err, token) => {
          if (err) throw err;
          res.json({
            token
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
); //Note that "/" here refers to the prefix of "api/users" + "/"

module.exports = router;
