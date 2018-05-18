// require models
var db = require('./../models/');

module.exports = function (app) {
  
  app.get("/api/artists/", function (req, res) {
    
    db.Art.findAll({
      include: [ artist_name ] 
    }).then((dbArtists) => {
      console.log('building return json file!');
      
      res.json(dbArtists);
    });
      
      
      
  });


//   app.get("/api/art/:artist", function(req, res){
//     connection.query("SELECT * FROM art WHERE artist_name = '" + req.params.artist + "'", function (err, dbData){
//       if (err) throw err
//       res.json(dbData)
//     })
//   })
};