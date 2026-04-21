const express = require('express');
const router = express.Router();
const db = require('../db');

// Get maintenance logs
router.get('/', (req, res) => {
    const query = `
        SELECT m.log_id, m.service_date, m.description, m.cost,
               v.vehicle_id, v.brand, v.model
        FROM Maintenance m
        JOIN Vehicles v ON m.vehicle_id = v.vehicle_id
        ORDER BY m.service_date DESC
    `;
    db.query(query, (err, result) => {
        if (err) res.status(500).json({ error: 'Database error' });
        else res.json(result);
    });
});

// Add maintenance log
router.post('/', (req, res) => {
    const { vehicle_id, service_date, description, cost } = req.body;
    db.query(
        "INSERT INTO Maintenance (vehicle_id, service_date, description, cost) VALUES (?, ?, ?, ?)",
        [vehicle_id, service_date, description, cost],
        (err) => {
            if (err) res.status(500).send("Error adding log");
            else res.send("Log Added");
        }
    );
});

// Delete maintenance log
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM Maintenance WHERE log_id = ?", [id], (err) => {
        if (err) res.status(500).send("Error deleting log");
        else res.send("Log Removed");
    });
});

module.exports = router;
