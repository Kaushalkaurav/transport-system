const express = require('express');
const router = express.Router();
const db = require('../db');

// Add vehicle
router.post('/', (req, res) => {
    const { vehicle_id, type, brand, model, owner_name } = req.body;

    db.query(
        "INSERT INTO Vehicles (vehicle_id, type, brand, model, owner_name) VALUES (?, ?, ?, ?, ?)",
        [vehicle_id, type, brand, model, owner_name],
        (err) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error");
            } else {
                res.send("Vehicle Added");
            }
        }
    );
});

// Get vehicles
router.get('/', (req, res) => {
    db.query("SELECT * FROM Vehicles", (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(result);
        }
    });
});

// Delete vehicle
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM Vehicles WHERE vehicle_id = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error");
        } else {
            res.send("Vehicle Removed");
        }
    });
});

// Update vehicle
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { type, brand, model, owner_name } = req.body;
    db.query(
        "UPDATE Vehicles SET type = ?, brand = ?, model = ?, owner_name = ? WHERE vehicle_id = ?",
        [type, brand, model, owner_name, id],
        (err) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error");
            } else {
                res.send("Vehicle Updated");
            }
        }
    );
});

module.exports = router;