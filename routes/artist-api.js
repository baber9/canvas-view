// require models
var db = require('./../models/');
var login = require('./login.js')

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

      if (valid) {
        login.setLoggedIn(true)
      }
      
      res.json({valid: valid});
    });
        
      // console.log(outcome);
      // res.send(valid);
      
  });

  // API GET specified artist (pulls from db and artsy - 2 apis)
  app.get("/api/artist/:artist", (req, res) => {
    
    // call external API (artsy) for artist info with passed callback
    getApiInfo(req.params.artist, apiResults => {
      
      // replace new line chars with <br />'s before returning
      apiResults.biography = apiResults.biography.replace(/\r?\n/g, "<br />");

      console.log('2 - API Results: ', apiResults);
      
      // sequelize call to find specified artist
      db.Art.findAll({
        where: {
          artist_name: req.params.artist
        }
      }).then(dbArtist => {
        // console.log('3 - dbArtist: ', dbArtist)


        
        var hbsObject = {
          artist: {
            database: dbArtist,
            api: apiResults
          }
        };

        // EX:  hbsObject.artist.api.birthday = artist bday
        // EX:  hbsObject.artist.database[0].art_title = title of first piece of art for artist

        // return results of db and artsy to use in handlebars
        res.render('index', hbsObject);
        
      });
    });
  });

  // API POST to add record to db
  app.post("/api/admin/post", (req,res) => {
    db.Art.create({
      art_title: req.body.art_title,
      artist_name: req.body.artist_name,
      image_url: req.body.image_url,
      museum_name: req.body.museum_name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
      phone: req.body.phone,
      website: req.body.website
    }).then(result => {
      res.json(result);
    });
  });


};

// FUNCTION to call artsy api (requires call back for async)
function getApiInfo(artistProper, cb) {
  
  // replace spaces with '-' and make lowercase
  var artist = artistProper.split(' ').join('-').toLowerCase();

  // setup traverson module
  traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);
  api = traverson.from('https://api.artsy.net/api').jsonHal();

  // call api.newRequest
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
      // console.log('1 - getResource: ', results)

      // callback with results
      cb(results);
    });

}

