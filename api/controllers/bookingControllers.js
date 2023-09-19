const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// const bcryptSalt = bcrypt.genSaltSync(10);
// const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';


// GET -- /api/bookings
// get all booking of user
const getBookings = asyncHandler(async (req, res) => {
    const userData = req.user;
    const booking = await Booking.find({ user: userData._id }).populate('place');
    if (booking) {
        res.status(200).json(booking);
    }
    else {
        res.status(404);
        throw new Error("Bookings not found");
    }
});


// POST --  /api/bookings
// Make a Booking of user
const makeBooking = asyncHandler(async (req, res) => {
    const userData = req.user;
    const {
        place, placeOwner, checkIn, checkOut, numberOfGuests, name, phone, price,
    } = req.body;

    if (placeOwner.toString() == userData._id.toString()) {
        res.status(400);
        throw new Error("You cannot book your own place");
    }

    if (!checkIn || !checkOut || !numberOfGuests || !name || !phone || !price) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const booking = await Booking.create({
        place, checkIn, checkOut, numberOfGuests, name, phone, price,
        user: userData._id,
    })

    if (booking) {
        res.status(201).json(booking);
    }
    else {
        res.status(400);
        throw new Error("Booking data is not valid");
    }
});

module.exports = { getBookings, makeBooking };