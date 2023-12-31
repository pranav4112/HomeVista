const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const jwtVerify = asyncHandler(async (req, res, next) => {
    const token = req.query.token;
    // console.log(token);
    if (token!=="null" && token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            try{
                const userdata = await User.findById(decoded.id);
                req.user = userdata;
                next();
            }
            catch(err){
                res.status(401);
                next(err);
                // throw new Error("User is not authorized");
            }
        })
    }
    else {
        res.status(401);
        throw new Error("Login to proceed");
    }

})

module.exports = jwtVerify;