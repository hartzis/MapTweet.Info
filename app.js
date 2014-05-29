var express = require('express');
var bodyParser = require('body-parser');

// mongodb database persistence via mongoose
var mongoose = require('mongoose');
// Connect to the database
mongoose.connect('mongodb://localhost/glut');

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

app.get('/', function(req, res) {
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
