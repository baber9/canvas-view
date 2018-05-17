var express = require('express');

var router = express.Router();

var admin = require('../models/admin.js');

// Routes

// router.get('/', (req, res) => {
//     var hbsObject = {
//         admin: data
//     };

//     // res.sendFile(adminView)
// });

router.post('/api/admins', (req, res) => {
    admin.create(['username', 'password'], [req.body.username, req.body.password], (result) => {
        var test = res.json({ id: result.id });
    });
});




module.exports = router;