const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema(
  {
    flightId: {
      type: String,
      required: true,
      unique: true,
    },
    missionId: {
      type: String,
      required: true,
    },
    droneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Drone',
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    altitude: {
      type: Number,
      required: true,
    },
    speed:{
      type:Number,
      required: true
    },
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
    radius: {
      type: Number,
      required: true,
    },
    waypoints: [
      {
        lat: Number,
        lng: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Mission', missionSchema);
