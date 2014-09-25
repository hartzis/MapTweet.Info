var gulp = require('gulp'),
  uglify = require('gulp-uglifyjs'),
  watch = require('gulp-watch'),
  del = require('del'),
  jade = require('gulp-jade');

// setup angular app paths
var paths = {
  angular: ['public/js/src/app.js', 'public/js/src/**/*.js'],
  minifiedLocation: 'public/js/min',
  angularAppViews: {
    jade: './views/app/**/*.jade',
    hmtl: './public/html'
  }
};

// compile jade templates to public/html
gulp.task('templates', function() {

  gulp.src('./views/app/**/*.jade')
    .pipe(jade({
      locals: angularAppViews.jade
    }))
    .pipe(gulp.dest(angularAppViews.html))
});

// clean old version of minified/uglified app
gulp.task('clean', function (cb) {
  del([paths.minifiedLocation+'/*.*'], cb);
})

// setup uglify of angular app
gulp.task('angularApp', ['clean'], function () {
    return gulp.src(paths.angular)
    .pipe(uglify('app.min.js', {
      outSourceMap: true
    }))
    .pipe(gulp.dest(paths.minifiedLocation));
})

// watch task setup
gulp.task('watch', function () {
  gulp.watch(paths.angular, ['angularApp']);
})

// default task with no watch
gulp.task('default', ['angularApp']);

