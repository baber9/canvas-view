var path = require('path');

// ROUTES

module.exports = (app) => {
    
    // home page route
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/assets/index.html"));
    });

    // admin login route
    app.get('/admin', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/assets/adminlogin.html"));
    });

};