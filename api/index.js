const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const dbConnect = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const placeRoutes = require('./routes/placeRoutes.js');
const bookingRoutes = require('./routes/bookingRoutes.js');



const app = express();
const PORT = process.env.PORT || 4001;

// app.use(express.json());
app.use(express.json({limit: "10mb", extended: true}));
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}));
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));


//DB connection
dbConnect();


//routes
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


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});