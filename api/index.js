const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Place = require('./models/Place.js');
const Booking = require('./models/Booking.js');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const mime = require('mime-types');
const dbConnect = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const placeRoutes = require('./routes/placeRoutes.js');
const bookingRoutes = require('./routes/bookingRoutes.js');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 4001;

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
const bucket = 'dawid-booking-app';

// app.use(express.json());
app.use(express.json({limit: "10mb", extended: true}));
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}));
app.use(cookieParser());
// app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));


//DB connection
dbConnect();

app.use('/api/user', userRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/bookings', bookingRoutes);


// api/user/profile
app.get('/api/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});


// api/places/upload-by-link
// app.post('/api/upload-by-link', async (req, res) => {
//   const { link } = req.body;
//   const newName = 'photo' + Date.now() + '.jpg';
//   await imageDownloader.image({
//     url: link,
//     dest: '/tmp/' + newName,
//   });
//   const url = await uploadToS3('/tmp/' + newName, newName, mime.lookup('/tmp/' + newName));
//   res.json(url);
// });


// api/places/uploadImg
// const photosMiddleware = multer({ dest: '/tmp' });
// app.post('/api/upload', photosMiddleware.array('photos', 100), async (req, res) => {
//   const uploadedFiles = [];
//   for (let i = 0; i < req.files.length; i++) {
//     const { path, originalname, mimetype } = req.files[i];
//     const url = await uploadToS3(path, originalname, mimetype);
//     uploadedFiles.push(url);
//   }
//   res.json(uploadedFiles);
// });


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});