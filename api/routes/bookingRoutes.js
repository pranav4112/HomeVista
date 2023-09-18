const express = require('express');
const {getBookings,makeBooking} = require('../controllers/bookingControllers');
const jwtVerify = require('../middlewares/jwtVerify');

const router = express.Router();

router.get('/', jwtVerify, getBookings);
router.post('/', jwtVerify, makeBooking);

module.exports = router;