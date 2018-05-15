// NEED TO CHANGE FROM EGGS TO ART/ARTS/ART_PIECES, etc


// THIS file is strictly use to handle the DATA

// import ORM from config/orm.js
var orm = require('../config/orm.js');

var egg = {
    all: (cb) => {
        orm.selectAll('eggs', (res) => {
            cb(res);
        });
    },
    create: (cols, vals, cb) => {
        orm.insertOne('eggs', cols, vals, (res) => {
            cb(res);
        });
    },
    update: (objColVals, condition, cb) => {
        orm.updateOne('eggs', objColVals, condition, (res) => {
            cb(res);
        });
    }
};

//export for use by controller (controllers/eggs_controller.js)
module.exports = egg;