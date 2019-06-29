var gulp = require('gulp');
var jasmineBrowser = require('gulp-jasmine-browser');
const jasmine = require('gulp-jasmine');
var corejs = require('core-js');


gulp.task('run_route_tests', function() {
  return gulp.src(['src/**/*.js','!src/WebApp/components/**/*.js','!src/WebApp/public/**/*.js','!gulpfile.js', 'tests/node/**/*.js'])
    .pipe(jasmine());
});

gulp.task('run_react_tests', function() {
  
  return gulp.src(['src/WebApp/public/javascripts/bundle.js','!gulpfile.js','tests/components/**/*.js'])
    .pipe(jasmineBrowser.specRunner({console: true}))
    .pipe(jasmineBrowser.headless({driver: 'chrome'}));
});