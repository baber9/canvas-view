// NEED TO CHANGE FROM EGGS TO ART/ARTS/ART_PIECES, etc

// require express node module
var express = require('express');

// use express Router for route handling
var router = express.Router();

// import model
var egg = require('../models/eggs.js');

// CREATE ROUTES

// get route
router.get('/', (req, res) => {
    
    // call egg model method .all
    egg.all((data) => {

        // create handlebars obj
        var hbsObject = {
            eggs: data
        };

        // pass to handlebar index view
        res.render('index', hbsObject);
    });
});

// post route
router.post('/api/eggs', (req, res) => {

    // call create method from egg model
    egg.create(['egg_name', 'devoured'], [req.body.name, req.body.devoured], (result) => {

        // return json object with new ID
        res.json({ id: result.newId });
    });
});

// put route
router.put('/api/eggs/:id', (req, res) => {

    // set devoured (used as param for update)
    var devoured = "id = " + req.params.id;

    // call update method from model
    egg.update({
        devoured: req.body.devoured
    }, devoured, (result) => {

        // return appropriate response
        if(result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// export for use by server.js
module.exports = router;