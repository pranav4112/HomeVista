const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const jwtVerify = asyncHandler(async (req, res, next) => {
    const token = req.query.token;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }

            const userdata = await User.findById(decoded.id);
            // console.log(userdata);
            req.user = userdata;
            next();
        })
    }
    else {
        res.status(401);
        throw new Error("Login to proceed");
    }

})

module.exports = jwtVerify;