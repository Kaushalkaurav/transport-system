const express = require('express');
const router = express.Router();
const db = require('../db');

// Get high-level stats
router.get('/stats', (req, res) => {
    const stats = { vehicles: 0, drivers: 0, activeTrips: 0 };
    
    db.query("SELECT COUNT(*) AS count FROM Vehicles", (err, vRes) => {
        if (!err) stats.vehicles = vRes[0].count;
        
        db.query("SELECT COUNT(*) AS count FROM Drivers", (err, dRes) => {
            if (!err) stats.drivers = dRes[0].count;
            
            db.query("SELECT COUNT(*) AS count FROM Trips WHERE status IN ('Pending', 'In-Transit')", (err, tRes) => {
                if (!err) stats.activeTrips = tRes[0].count;
                res.json(stats);
            });
        });
    });
});

module.exports = router;
