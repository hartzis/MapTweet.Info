var http = require('http');

// Ping maptweet every 9mins
var keepAlive = function() {
  setInterval(function() {
    http.get('http://maptweet.herokuapp.com/');
  }, 1000 * 60 * 9);
};

module.exports = {keepAlive: keepAlive};