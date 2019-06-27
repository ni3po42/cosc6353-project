var gulp = require('gulp');
var jasmineBrowser = require('gulp-jasmine-browser');

gulp.task('run_tests', function() {
  return gulp.src(['src/**/*.js', 'spec/**/*.js'])
    .pipe(jasmineBrowser.specRunner({console: true}))
    .pipe(jasmineBrowser.headless({driver: 'phantomjs'}));
});