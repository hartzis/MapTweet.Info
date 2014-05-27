// allow grunt-cli to ru this gruntfile and tell us waht "grunt" is
module.exports = function (grunt) {
  // initialize the grunt configuration
  grunt.initConfig({
    // configure the uglify task (grunt uglify)
    uglify: {
      // this next level includes all sub-tasks (grunt uglify:development)
      development: {
        // configure the set of files to use in this subtask
        // it will be an array of file definitions
        files: [
          {
            // key is the destination, value is the source
            "public/js/min/app.min.js": ["public/js/src/*.js", "public/js/src/*/*.js"]
          }
        ],
        // set options for this
        options: {
          // the file will still get uglified and minified, but will still look readable
          beautify: true,
          // source map actually tracks the original line numbers when errors happen
          sourceMap: true
        }
      },
      // configure the build subtask (grunt uglify:build)
      build: {
        // use grunt templating to use the same files from the dev subtask
        files: '<%= uglify.development.files %>'
      }

    },


    // configure the "watch" task
    watch: {

      // watch js files
      // uglify development subtask
      js: {
        files: ['public/js/src/*.js', 'public/js/src/*/*.js'],
        tasks: 'uglify:development'
      }
    }


  });

// set up custom tasks -> name of task, [tasks to run]

// register the dev tasks to run with 'grunt dev' is run
// run pre-compile since watch only waits for changes,
// then run watch to update automatically on change
grunt.registerTask('dev', 
  ['uglify:development', 'watch']);
grunt.registerTask('build', ['uglify:build']);

// register the default tasks to run with just 'grunt' is run
grunt.registerTask('default', ['uglify']);

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');



};