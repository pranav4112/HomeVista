const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Place = require('../models/Place');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const bcryptSalt = bcrypt.genSaltSync(10);

// Register user
// api/user/register
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  const userDoc = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  });

  if(userDoc){
    jwt.sign({
      email: userDoc.email,
      id: userDoc._id
    }, process.env.JWT_SECRET, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token, {
        httpOnly: true,
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
        // maxAge: 20 * 1000 // 20 sec
      })
      .status(201).json(userDoc);
    });
  }
  else{
    res.status(400);
    throw new Error("User data is not valid");
  }

});

// Login user
// POST -- api/user/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({
        email: userDoc.email,
        id: userDoc._id
      }, process.env.JWT_SECRET, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token, {
          httpOnly: true,
          path: "/",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
          // maxAge: 20 * 1000 // 20 sec
        })
        .json(userDoc);
      });
    } else {
      res.status(422).json('Incorrect password');
    }
  } else {
    res.status(400).json("email or password is not valid");
  }
});


// Logout user
// POST -- api/user/logout
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie('token', { path: '/' }).json(true);
})


// Showing user booked places
// GET -- api/user/user-places
const userPlaces = asyncHandler(async (req, res) => {
  const user = req.user;
  const places = await Place.find({ owner: user._id });
  if(places){
    res.status(200).json(places);
  }
  else{
    res.status(404);
    throw new Error("places not found");
  }
});


module.exports = { createUser, loginUser, logoutUser, userPlaces };



