
var conf = {
  secret: process.env.secret,
  twitter: {
    ApiKey: process.env.twitterApiKey,
    ApiSecret: process.env.twitterApiSecret,
    callbackURL: process.env.twitterCallbackURL
  }
}

module.exports = conf;