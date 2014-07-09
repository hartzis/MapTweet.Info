var express = require('express');
var bodyParser = require('body-parser');

// load conf data
var conf = require('./config/conf.js');

// mongodb database persistence via mongoose
var mongoose = require('mongoose');

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

// Connect to the database
var mongoDatabase = process.env.MONGOHQ_URL || 'mongodb://localhost/glut';
mongoose.connect(mongoDatabase);

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// Add in the cookieParser and flash middleware so we can
// use them later
app.use(cookieParser());
// Initialize the express session. Needs to be given a secret property
app.use(session({
    secret: conf.secret,
    saveUninitialized: true,
    resave: true
}));
// Hook in passport to the middleware chain
app.use(passport.initialize());
// Hook in the passport session management into the middleware chain.
app.use(passport.session());

// setup base angular route renders
var angularRoutes = require('./controllers/angularRoutes');

// load search save/load
// and twitter api search controller 
var searchController = require('./controllers/searchController');

// main login page
app.get('/auth/login', function(req, res) {
  // if not logged in load welcome/sign-in page
  res.render('welcome');
});

// logout route
app.get('/auth/logout', function(req, res) {
  // Passport injects the logout method for us to call
  // console.log('logout post received');
  req.logout();
  // console.log('logout success');
  // console.log('sending 200');
  // res.send(200);
  // // Redirect back to the login page
  res.redirect('/auth/login');
});

// welcome about info
app.get('/about', function(req, res) {
  res.render('about');
});

// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
app.get('/auth/twitter', passport.authenticate('twitter'));

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        failureRedirect: '/auth/login'
    }), function(res, req) {
        // twitter login working redirecting to search
        req.redirect('/')
    });

// ***** IMPORTANT ***** //
// By including this middleware (defined in our config/passport.js module.exports),
// We can prevent unauthorized access to any route handler defined after this call
// to .use()
app.use(passportConfig.ensureAuthenticated);

app.get('/', function(req, res) {
  // if user logged in go to index
  // pass user info
  res.render('index', {
    twitter_user: req.user.twitter
  });
});

// handle all angular partial routes
app.get('/partials/:name', angularRoutes.partials);
// handle all angular directive template routes
app.get('/templates/:name', angularRoutes.templates);

// save search information
app.post('/api/search', searchController.postSearch);
// perform twitter api search and return tweets
app.get('/api/search', searchController.getSearch);
// remove search by id from users geosearches
app.delete('/api/search', searchController.removeSearch);
// remove all search history for a user
app.delete('/api/search/all', searchController.removeAll);

// return search history for user
app.get('/api/search/history', searchController.searchHistory);

// setup for production
var port = Number(process.env.PORT || 5536);
var server = app.listen(port, function() {
	console.log('Express server listening on port ' + server.address().port);
});
