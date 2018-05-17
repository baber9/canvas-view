// Config FILE to SETUP MySQL

// require mysql node module
var mysql = require('mysql');

var connection;

// set connection
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "canvasview_db"
      });
};

// create connection
connection.connect((err) => {
    if(err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});

// export for ORM use
module.exports = connection;
