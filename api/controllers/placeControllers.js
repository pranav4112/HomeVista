const asyncHandler = require('express-async-handler');
const Place = require('../models/Place');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary');

// const bcryptSalt = bcrypt.genSaltSync(10);

//Get all places
// GET -- api/places
const getAllPlaces = asyncHandler(async (req, res) => {
  const places = await Place.find();
  if (places) {
    res.status(200).json(places);
  }
  else {
    res.status(404);
    throw new Error("Places not found");
  }
});

//Get information of single place
// GET -- api/places/:id
const getPlace = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  if (place) {
    res.status(200).json(place);
  }
  else {
    res.status(404);
    throw new Error("Place not found");
  }
});

// Create place
// POST -- api/places
const createPlace = asyncHandler(async (req, res) => {
  const userData = req.user;
  const {
    title, address, addedPhotos, description, price,
    perks, extraInfo, checkIn, checkOut, maxGuests,
  } = req.body;

  const place = await Place.create({
    owner: userData._id, price,
    title, address, photos: addedPhotos, description,
    perks, extraInfo, checkIn, checkOut, maxGuests,
  })

  if (place) {
    res.status(201).json(place);
  }
  else {
    res.status(400);
    throw new Error("Place data is not valid");
  }
});

// Updating existing place
// PUT -- api/places
const updatePlace = asyncHandler(async (req, res) => {
  const userData = req.user;
  const {
    id, title, address, addedPhotos, description,
    perks, extraInfo, checkIn, checkOut, maxGuests, price,
  } = req.body;

  const placeDoc = await Place.findById(id);

  if (userData._id.toString() === placeDoc.owner.toString()) {
    placeDoc.set({
      title, address, photos: addedPhotos, description,
      perks, extraInfo, checkIn, checkOut, maxGuests, price,
    });
    await placeDoc.save();
    res.status(200).json(placeDoc);
  }
  else {
    res.status(403);
    throw new Error("User don't have permission to update other user Place");
  }

});


const uploadImage = asyncHandler(async (req, res) => {
  const imgFile = req.body.data;

  const result = await cloudinary.uploader.upload(imgFile, {
    upload_preset: 'HomeVista_App',
    folder: 'HomeVista_Images',
  });

  if(result){
    const url = result.secure_url;
    res.status(200).json({data : url});
  }
  else{
    res.status(500);
    throw new Error("Image not uploaded or server error");
  }
})

// const uploadImageByLink = asyncHandler(async (req, res) => {
//   const { link } = req.body;
//   const newName = 'photo' + Date.now() + '.jpg';
//   await imageDownloader.image({
//     url: link,
//     dest: '/tmp/' + newName,
//   });
//   const url = await uploadToS3('/tmp/' + newName, newName, mime.lookup('/tmp/' + newName));
//   res.json(url);
// })

module.exports = { getAllPlaces, getPlace, createPlace, updatePlace, uploadImage };