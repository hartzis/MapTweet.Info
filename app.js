var express = require('express');
var bodyParser = require('body-parser');



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

app.get('/getLatLng', locationController.getLatLng);

var server = app.listen(5536, function() {
	console.log('Express server listening on port ' + server.address().port);
});
