const express = require('express');
const {createUser, loginUser, logoutUser, userPlaces, userData} = require('../controllers/userControllers');
const jwtVerify = require('../middlewares/jwtVerify');

const router = express.Router();


router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/profile',userData);
router.post('/logout', logoutUser);
router.get('/user-places', jwtVerify, userPlaces);


module.exports = router;