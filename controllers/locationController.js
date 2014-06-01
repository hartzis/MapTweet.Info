// load conf data
var dev = false;
if (!process.env.MONGOHQ_URL) {
  dev = true;
  var conf = require('../conf.js');
}
var googleApiKey = dev ? conf.googleApiKey : process.env.googleApiKey

var https = require('https');

var getLatLongFromLocation = function(location, cb) {
    //Prepares the inputted address into the search query
    var query = location.split(' ').join('+') + '&sensor=false';
    var key = '$key=' + googleApiKey;
    var options = {
        host: 'maps.googleapis.com',
        path: '/maps/api/geocode/json?address=' + query + key
    };
    console.log('making geocode request!')
    var req = https.get(options, function(res) {
        console.log('geocode response- ' + res.statusCode);
        var results = '';
        res.on('error', function(e) {
            console.log('Got error: ' + e.message);
        });
        res.on('data', function(data) {
            results += data;
        });
        res.on('end', function() {
            var body = JSON.parse(results);
            //console.log(body);
            if (body.error_message) {
                console.log(body.error_message);
                return;
            };
            var lat = (body.results[0].geometry.location.lat),
                lng = (body.results[0].geometry.location.lng),
                address = (body.results[0].formatted_address),
                newLocation = {
                    address: address,
                    latitude: lat,
                    longitude: lng
                };
            if (cb) {
                cb(newLocation);
            } else {
                return newLocation;
            };
        });
    });
}

var locationControllers = {
    getLatLng: function(req, res) {
        console.log('request location-', req.query)
        var theLocation = req.query.location;
        getLatLongFromLocation(theLocation, function(loc) {
            res.send(loc);
        })
    }
}

module.exports = locationControllers;