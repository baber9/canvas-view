// require models
var db = require('./../models/');

// setup bcrypt
var bcrypt = require('bcrypt');
var saltRounds = 10;

module.exports = function(app) {
  
  // API GET call to fetch all artist names in db
  app.get("/api/artists", function(req, res) {
    
    db.Art.findAll({
      // pull artist_name
      attributes: [ 'artist_name' ],
      // group by artist_name (to pull uniques only)
      group: [ 'artist_name'] 
    }).then((dbArtists) => {
      // return json
      res.json(dbArtists);
    });
      
      
      
  });

  // API POST call to store hashed admin pw
  app.post("/api/admins", (req, res) => {
    var password = '';
    var username = 'admin';

    // hash password
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        // store hash in db
        db.Admin.create({
          name: username,
          password: hash
        }).then((result) => {
          console.log('New Admin Added: ' + username);
        });
      });
    });
  });

  // api POST to compare hashed pw for admin login
  app.post("/api/admin/", (req,res) => {
    var valid = false;
    db.Admin.findOne({
      where: {
        name: req.body.name
      }
    }).then((result) => {
      // check password sync  
      var valid = bcrypt.compareSync(req.body.password, result.password);
      
      res.json({valid: valid});
    });
        
      // console.log(outcome);
      // res.send(valid);
      
  });

//   app.get("/api/art/:artist", function(req, res){
//     connection.query("SELECT * FROM art WHERE artist_name = '" + req.params.artist + "'", function (err, dbData){
//       if (err) throw err
//       res.json(dbData)
//     })
//   })
};