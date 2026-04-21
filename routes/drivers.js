const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all drivers
router.get('/', (req, res) => {
    db.query("SELECT * FROM Drivers", (err, result) => {
        if (err) res.status(500).json({ error: 'Database error' });
        else res.json(result);
    });
});

// Add driver
router.post('/', (req, res) => {
    const { name, license_number, phone } = req.body;
    db.query(
        "INSERT INTO Drivers (name, license_number, phone) VALUES (?, ?, ?)",
        [name, license_number, phone],
        (err) => {
            if (err) res.status(500).send("Error adding driver");
            else res.send("Driver Added");
        }
    );
});

// Update driver
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, license_number, phone } = req.body;
    db.query(
        "UPDATE Drivers SET name = ?, license_number = ?, phone = ? WHERE driver_id = ?",
        [name, license_number, phone, id],
        (err) => {
            if (err) res.status(500).send("Error updating driver");
            else res.send("Driver Updated");
        }
    );
});

// Delete driver
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM Drivers WHERE driver_id = ?", [id], (err) => {
        if (err) res.status(500).send("Error deleting driver");
        else res.send("Driver Removed");
    });
});

module.exports = router;
