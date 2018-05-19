// require models
var db = require('./../models/');

// requires for external api
require('dotenv').config();
var traverson = require('traverson'),
    JsonHalAdapter = require('traverson-hal'),
    xappToken = process.env.xappToken;



// setup bcrypt (for password hashing and compare)
var bcrypt = require('bcrypt');
var saltRounds = 10;

module.exports = function(app) {
  
  // API GET call to fetch all artist names in db
  app.get("/api/artists", (req, res) => {
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

  // API POST to compare hashed pw for admin login
  app.post("/api/admin/", (req,res) => {
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

  // API GET specified artist
  app.get("/api/artist/:artist", (req, res) => {
    // call external API for artist info
    function getArtistInfo() {
      getApiInfo ((req.params.artist), (results) => {
          return results;
      });
    }
    var apiResults = getArtistInfo();
      
  console.log(apiResults);
    
    db.Art.findAll({
      where: {
        artist_name: req.params.artist
      }
    }).then((dbArtist) => {

      
      // NEED TO FIND A WAY TO RETURN APIRESULTS (ASYNC)
      // return artist
      // console.log(apiInfo);
      res.json({database: dbArtist, api: apiResults});
    });
  });
};

function getApiInfo(artistProper, cb) {
  // replace spaces with '-' and make lowercase
  var artist = artistProper.split(' ').join('-').toLowerCase();

  traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);
  api = traverson.from('https://api.artsy.net/api').jsonHal();

  api.newRequest()
  .follow('artist')
  .withRequestOptions({
    headers: {
      'X-Xapp-Token': xappToken,
      'Accept': 'application/vnd.artsy-v2+json'
    }
  })

    .withTemplateParameters({ id: artist })
    .getResource((error, results) => {
      // WILL USE artist.name, artist.hometown, artist.biography, artist._links.thumbnail.href (for img src), and maybe birthday
      // console.log(results);
      return results;
    });

}