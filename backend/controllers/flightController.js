const mongoose = require('mongoose');
const flightModel = require('../models/flightModel');
const missionModel = require('../models/missionModel');
const algorithm = require('../utils/algorthm')
const PDFDocument = require('pdfkit');
const fs = require('fs');

module.exports.log = async (req, res) => {
  const userId = req.userId;  // Ensure userId is passed from authentication middleware

  if (!userId) {
    return res.status(400).json({ msg: 'User ID is missing or not authenticated.' });
  }

  try {
    const missions = await missionModel.find({ userId });

    if (missions.length === 0) {
      return res.status(404).json({ msg: 'No missions found for the specified user' });
    }

    const flightLogs = [];

    for (const mission of missions) {
      if (!mission.waypoints || mission.waypoints.length === 0) {
        return res.status(400).json({ msg: 'No waypoints found for the mission' });
      }

      const totalDistance = algorithm.calculateTotalDistance(mission.waypoints);

      const newFlightLog = new flightModel({
        userId,
        flightId: mission.flightId,
        droneId: mission.droneId,
        missionName: mission.name,
        waypoints: mission.waypoints,
        distance: totalDistance,
        speed: mission.speed,
      });

      // Save each flight log
      await newFlightLog.save();
      flightLogs.push(newFlightLog);
    }

    // Return mission and flight logs
    res.status(200).json({flightLogs});

  } catch (err) {
    console.error('Error fetching missions:', err);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

module.exports.logpdf = async (req, res) => {
  const userId = req.userId;  
  // console.log(userId);
  if (!userId) {
    return res.status(400).json({ msg: 'User ID is missing' });
  }

  try {
    const flightLogs = await flightModel.find({ userId });

    if (flightLogs.length === 0) {
      return res.status(404).json({ msg: 'No flight logs found for the specified user' });
    }

    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=flight_logs.pdf');

    doc.pipe(res);

    doc.fontSize(18).text('Flight Logs', { align: 'center' });
    doc.moveDown();

    flightLogs.forEach((log, index) => {
      doc.fontSize(12).text(`Log #${index + 1}`);
      doc.text(`Flight ID: ${log.flightId}`);
      doc.text(`Drone ID: ${log.droneId}`);
      doc.text(`Mission Name: ${log.missionName}`);

      doc.text('Waypoints:');
      log.waypoints.forEach((waypoint, i) => {
        doc.text(` Lat: ${waypoint.lat}, Long: ${waypoint.lng}`);
      });

      doc.text(`Speed: ${log.speed} `);
      doc.text(`Distance: ${log.distance} `);
      
    });

    doc.moveDown();
    doc.end();

  } catch (err) {
    console.error('Error generating PDF:', err);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

