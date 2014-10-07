module.exports = function(){
  return {

    basePath : '../',

    files : [
      // 3rd party
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-animate/angular-animate.js',

      //App-specific Code
      'public/js/src/services/*.js',
      'public/js/src/directives/*.js',
      'public/js/src/controllers/*.js',
      'public/js/src/app.js',

      //Test-Specific Code
      'node_modules/chai/chai.js',
      'test/lib/chai-expect.js'

    ],

    autoWatch : false,

    frameworks: ['mocha'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-mocha'
            ]

  }
};