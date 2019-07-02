const express = require("express");
const router = express.Router(); //Get express' router
const User = require("../models/User");
const {
  check,
  validationResult
} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('config');


//POST:Submitting some data/adding contact
//GET:Fetch/getting data
//PUT: Update something
//DELETE: Remove something
//---------------------------------
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
// We want to make sure that a email and password is sent
router.post("/", [
    check(
      'email', 'Please include a valid email',
      check('password', 'Password is required').exists()
    )
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //If the requirements were NOT met
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      }); //Send a error code and an array of the errors
    }

    const {
      email,
      password
    } = req.body;

    try {
      let user = await User.findOne({
        email
      });
      if (!user) {
        return res.status(400).json({
          msg: 'Email not registered!'
        })
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          msg: 'Incorrect password!'
        })
      }

      //Payload for jwt
      const payload = {
        user: {
          id: user.id
        }
      }
      //jwt takes: Sign, payload, options, and a call back
      //When it expires they'll have to log back in
      jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: 46000
      }, (err, token) => {
        if (err) throw err;
        res.json({
          token
        });
      });

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

  }); //Note that "/" here refers to the prefix of "api/users" + "/"

module.exports = router;