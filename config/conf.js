
var conf;

if (process.env.NODE_ENV === 'production'){
  var prodConf = require('./prodConf.js')
  conf = prodConf;
} else {
  var devConf = require('./devConf.js')
  conf = devConf;
}

module.exports = conf;