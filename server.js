// use express body-parser node modules
var express = require('express');
var bodyParser = require('body-parser');

// set PORT
var PORT = process.env.PORT || 3000;

// instanciate express
var app = express();

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

// import routes and give server access
require("./routes/artist-api.js")(app);

// listener
app.listen(PORT, () => {
    console.log("App listening at localhost:" + PORT);
});
