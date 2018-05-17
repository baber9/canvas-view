var connection = require("../config/connection.js")

module.exports = function(app) {
  app.get("/api/art", function(req, res) {
    connection.query('SELECT * FROM art', function (err, dbData){
      if (err) throw err
      res.json(dbData)
    })
  })

  app.get("/api/art/:artist", function(req, res){
    connection.query("SELECT * FROM art WHERE artist_name = '" + req.params.artist + "'", function (err, dbData){
      if (err) throw err
      res.json(dbData)
    })
  })
}