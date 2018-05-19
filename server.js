// use express body-parser node modules
var express = require('express');
var bodyParser = require('body-parser');

// set PORT
var PORT = process.env.PORT || 3000;

// instanciate express
var app = express();

// require models
var db = require('./models');


// EXPRESS SETUP

// Serve static content from 'public' directory
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// use and set handlebars
var exphbs = require('express-handlebars');

// set views (handlebars)
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// ROUTES
require('./routes/artist-html.js')(app);
require("./routes/artist-api.js")(app);



// listener
db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log("App listening on PORT " + PORT);
    });
});
