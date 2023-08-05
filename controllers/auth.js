const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const keys = require("../config/keys");
const errorHandler = require("../utils/errorHandler");

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    // password check, user exists
    const passwordResult = bcrypt.compareSync(
      req.body.password,
      candidate.password
    );
    if (passwordResult) {
      // token generation, passwords matched. Token storage time hour
      const token = jwt.sign(
        {
          email: candidate.email,
          userId: candidate._id,
        },
        keys.jwt,
        { expiresIn: 1000 * 60 }
      );

      res.status(200).json({
        token: `Bearer ${token}`,
        message: 'You have successfully logged into the application'
      });
    } else {
      // passwords did not match
      res.status(401).json({
        message: "Passwords do not match, please try again",
      });
    }
  } else {
    // No user, error
    res.status(404).json({
      message: "User with this email was not found",
    });
  }
};

module.exports.register = async function (req, res) {
  // emai password
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    // add error
    res.status(409).json({
      message: "This email already exists",
    });
  } else {
    // password hash generation
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    // create user
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
    });

    try {
      await user.save();
      res.status(201).json({
        user,
        message: "Now you can log in using your details",
      });
    } catch (e) {
      // handle error
      errorHandler(res, e);
    }
  }
};
