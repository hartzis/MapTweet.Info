var express = require('express');
var bodyParser = require('body-parser');

// mongodb database persistence via mongoose
var mongoose = require('mongoose');
// Connect to the database
mongoose.connect('mongodb://localhost/glut');

// Express Session allows us to use Cookies to keep track of
// a user across multiple pages. We also need to be able to load
// those cookies using the cookie parser
var session = require('express-session');
var cookieParser = require('cookie-parser');

// Load in the base passport library so we can inject its hooks
// into express middleware.
var passport = require('passport');

// Load in our passport configuration that decides how passport
// actually runs and authenticates
var passportConfig = require('./config/passport');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

// setup base angular route renders
var angularRoutes = require('./controllers/angularRoutes');

// location route controllers
var locationController = require('./controllers/locationController');

// load search save/load
// and twitter api search controller 
var searchController = require('./controllers/searchController');

app.get('/auth/login', function(req, res) {
  // if not logged in load welcome/sign-in page
  res.render('welcome');
});

// ***** IMPORTANT ***** //
// By including this middleware (defined in our config/passport.js module.exports),
// We can prevent unauthorized access to any route handler defined after this call
// to .use()
app.use(passportConfig.ensureAuthenticated);

app.get('/', function(req, res) {
  // if user logged in go to index
  res.render('index');
});

app.get('/partials/:name', angularRoutes.partials);

// retrieve the lat/lng of a location/address
app.get('/api/getLatLng', locationController.getLatLng);

// save search information
app.post('/api/search', searchController.postSearch)
// perform twitter api search and return tweets
app.get('/api/search', searchController.getSearch)

var server = app.listen(5536, function() {
	console.log('Express server listening on port ' + server.address().port);
});
