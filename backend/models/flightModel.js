const mongoose = require('mongoose');

const flightLogSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    required: true
  },
  flightId: {
    type: String,
    required: true,
  },
  droneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Drone',
    required: true,
  },
  missionName: {
    type: String,
    required: true,
  },
 waypoints: [
      {
        lat: Number,
        lng: Number,
      },
  ],
  speed: {
    type: Number,
    required: true,
  },
  distance:{
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('FlightLog', flightLogSchema);
