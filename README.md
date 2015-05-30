# MapTweet.Info

![Image of how to use MapTweet](https://raw.githubusercontent.com/hartzis/MapTweet.Info/master/public/img/maptweet_demo.gif)

----
## What is MapTweet?
[maptweet](http://maptweet.herokuapp.com)

This web application allows you to search the twitter api for tweets at a given location with a specific query. If there are geo-located tweets( tweets that have a latitude and longitude ) they will be displayed on a map.

![Image of MapTweet.Info Map](http://www.hartzis.me/images/maptweet-info-ss.png)

----
## Usage
1. Find the most recent tweets in a specific area.
2. Enter search parameters
3. Specify desired query
4. Search!

![Image of MapTweet.Info Search](http://www.hartzis.me/images/maptweet-search-ss.png)

----
## Feature log-ish
* 20140911 - Google Analytics now tracking you
* 20140804 - Animations between app states
* 20140601 - Geo-tweets visualized on map
* 20140529 - Search twitter api by geolocation

----
## ToDo's
* Remove jquery dependency
* Remove re-tweets from displayed tweets
* move all angular jade components to html via gulp

----
## Libraries and Such
* [angularjs](https://angularjs.org/)
* [UI.map](http://angular-ui.github.io/ui-map/)
* [UI Bootstrap](http://angular-ui.github.io/bootstrap/)
* [Twit](https://www.npmjs.org/package/twit)
