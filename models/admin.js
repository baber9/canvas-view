var orm = require('../config/orm.js');

var admin = {
    all: (cb) => {
        orm.selectAll('admins', (res) => {
            cb(res);
        });
    },
    create: (cols, vals, cb) => {
        orm.insertOne('admins', cols, vals, (res) => {
            cb(res);
        });
    }
}

module.exports = admin;