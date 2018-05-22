var path = require('path');
var login = require('./login.js')

// ROUTES

module.exports = (app) => {
    
    // home page route
    app.get('/', (req, res) => {
        login.setLoggedIn(false);
        res.sendFile(path.join(__dirname, "../public/assets/index.html"));
    });

    // admin login route
    app.get('/admin', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/assets/adminlogin.html"));
    });

    // admin art entry form
    app.get('/admin/entry', (req, res) => {

        // check login.js to see if user is logged in when trying to access admin/entry
        if (login.isLoggedIn()){
            res.sendFile(path.join(__dirname, "../public/assets/admintextentry.html"));
        } else {
            res.redirect('/admin')
        }
    })
};