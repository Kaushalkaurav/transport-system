const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    if (password === adminPassword) {
        req.session.isLoggedIn = true;
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).send("Error saving session");
            }
            res.status(200).send("Logged In");
        });
    } else {
        res.status(401).send("Invalid password");
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.send("Logged out");
});

router.get('/status', (req, res) => {
    res.json({ isLoggedIn: !!req.session.isLoggedIn });
});

module.exports = router;
