var path = require('path');

// ROUTES

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/assets/index.html"));
    });

    app.get('/admin', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/assets/adminlogin.html"));
    });
};