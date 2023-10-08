const cloudinary = require('cloudinary').v2;
require("dotenv").config();
          
cloudinary.config({ 
  cloud_name: 'doxgawone', 
  api_key: '879157784848184', 
  api_secret: 'VUotGim2srm0ANEBvdz2OT0QbKQ',
});


module.exports = cloudinary;