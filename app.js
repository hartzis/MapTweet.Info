var express = require('express');
var bodyParser = require('body-parser');

// We need database persistence
var mongoose = require('mongoose');
// Connect to the database
mongoose.connect('mongodb://localhost/glut');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

// setup base angular route renders
var angularRoutes = require('./controllers/angularRoutes.js');

// location route controllers
var locationController = require('./controllers/locationController.js');

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/partials/:name', angularRoutes.partials);

app.get('/api/getLatLng', locationController.getLatLng);

// save search information
app.post('/api/search')
// perform twitter api search and return tweets
app.get('/api/search')

var server = app.listen(5536, function() {
	console.log('Express server listening on port ' + server.address().port);
});
