const express = require('express');
const app = express();
const dotenv = require('dotenv');   
dotenv.config(); 
const connectToDb = require('./config/db');
const userRoute = require('./routes/authRoute')
const droneRoute = require('./routes/dronesRoute')
const missionRoute = require('./routes/missionRoute')
const flightRoutes = require('./routes/flightLogRoutes')


// MIDDLEWARE
app.use(express.json());

// DATABASE CONNECTION
connectToDb();

app.get('/', (req, res) => {
    res.send('Drone Survey Backend - This is the backend for the Drone Survey application. It is built using Node.js, Express, and MongoDB.');
});

// ROUTES
app.use('/user', userRoute);
app.use('/drone', droneRoute)
app.use('/mission', missionRoute)
app.use('/flight', flightRoutes)







// CONNECTION TO PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
