const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all trips (with joins for vehicle and driver names)
router.get('/', (req, res) => {
    const query = `
        SELECT t.trip_id, t.start_location, t.destination, t.status, t.created_at,
               v.vehicle_id, v.brand, v.model,
               d.driver_id, d.name as driver_name
        FROM Trips t
        JOIN Vehicles v ON t.vehicle_id = v.vehicle_id
        JOIN Drivers d ON t.driver_id = d.driver_id
        ORDER BY t.created_at DESC
    `;
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(result);
        }
    });
});

// Add trip
router.post('/', (req, res) => {
    const { vehicle_id, driver_id, start_location, destination } = req.body;
    db.query(
        "INSERT INTO Trips (vehicle_id, driver_id, start_location, destination) VALUES (?, ?, ?, ?)",
        [vehicle_id, driver_id, start_location, destination],
        (err) => {
            if (err) res.status(500).send("Error adding trip");
            else res.send("Trip Added");
        }
    );
});

// Update trip status
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db.query(
        "UPDATE Trips SET status = ? WHERE trip_id = ?",
        [status, id],
        (err) => {
            if (err) res.status(500).send("Error updating trip");
            else res.send("Trip Updated");
        }
    );
});

// Delete trip
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM Trips WHERE trip_id = ?", [id], (err) => {
        if (err) res.status(500).send("Error deleting trip");
        else res.send("Trip Removed");
    });
});

module.exports = router;
