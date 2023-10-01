const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const dbConnect = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const placeRoutes = require('./routes/placeRoutes.js');
const bookingRoutes = require('./routes/bookingRoutes.js');
const errorHandler = require('./middlewares/errorHandler.js');



const app = express();
const PORT = process.env.PORT || 4001;

// app.use(express.json());
app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'https://homevista-api.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // origin: 'http://localhost:5173',
}));

//DB connection
dbConnect();


//routes
app.use('/api/user', userRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/bookings', bookingRoutes);
// Error middleware
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});