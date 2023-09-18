const express = require('express');
const {getAllPlaces,getPlace,createPlace,updatePlace,uploadImage} = require('../controllers/placeControllers');
const jwtVerify = require('../middlewares/jwtVerify');

const router = express.Router();

router.get('/',getAllPlaces);
router.get('/:id',getPlace);
router.post('/', jwtVerify, createPlace);
router.put('/', jwtVerify, updatePlace);
router.post('/upload-img',uploadImage);

module.exports = router;