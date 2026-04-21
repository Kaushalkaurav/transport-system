require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
// Trust proxy for Render/Railway (required for sessions behind reverse proxy)
app.set('trust proxy', 1);

app.use(session({
    secret: process.env.SESSION_SECRET || 'transport_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));

// Protect HTML files except login
app.use((req, res, next) => {
    const isHtml = req.path.endsWith('.html') || req.path === '/';
    if (isHtml && req.path !== '/index.html') {
        if (!req.session.isLoggedIn) {
            return res.redirect('/index.html');
        }
    }
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/vehicles', require('./routes/vehicles'));
app.use('/drivers', require('./routes/drivers'));
app.use('/trips', require('./routes/trips'));
app.use('/maintenance', require('./routes/maintenance'));
app.use('/dashboard', require('./routes/dashboard'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});