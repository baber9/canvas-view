// This FILE is mainly used to store ORMS
// - includes 2 helper functions

// import MySQL connection (from connection.js)
var connection = require('./connection.js');


// FUNCTION - to assist in adding placeholders (?'s) to SQL queryString
function printPlaceholders(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push('?');
    }

    return arr.toString();
}

// FUNCTION - to assist in converting obj to string for SQL queryString
function ObjectToSql(obj) {
    var arr = [];
    for (var key in obj) {
        var keyValue = obj[key];

        // skip hidden properties
        if (Object.hasOwnProperty.call(obj, key)) {
            // if the string has spaces, put value in quotes
            if(typeof keyValue === 'string' && keyValue.indexOf(' ') >= 0) {
                keyValue = "'" + keyValue + "'";
            }
            arr.push(key + '=' + keyValue);
        }
    }
    // convert array to strings before returning
    return arr.toString();
}

// ORM for all SQL statements
var orm = {
    selectAll: (tableInput, cb) => {

        var queryString = 'SELECT * FROM ' + tableInput + ';';
        connection.query(queryString, (err, result) => {
            if (err) {throw err;}
            cb(result);
        });

    },
    insertOne: (table, cols, vals, cb) => {
        
        // build queryString
        var queryString = 'INSERT INTO ' + table;
        queryString += ' (';
        queryString += cols.toString();
        queryString += ') ';
        queryString += 'VALUES (';

        // call printPlaceholders
        queryString += printPlaceholders(vals.length);
        queryString += ') ';

        connection.query(queryString, vals, (err, result) => {
            if(err) {throw err;}
            cb(result);
        });

    },
    updateOne: (table, objColVals, condition, cb) => {

        // build queryString
        var queryString = 'UPDATE ' + table;
        queryString += ' SET ';
        queryString += ObjectToSql(objColVals);
        queryString += ' WHERE ';
        queryString += condition;

        connection.query(queryString, (err, result) => {
            if(err) {throw err;}
            cb(result);
        });
    }
}

// export ORM for use in models/art.js
module.exports = orm;