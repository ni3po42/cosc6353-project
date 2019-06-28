var gulp = require('gulp');
var jasmineBrowser = require('gulp-jasmine-browser');
const jasmine = require('gulp-jasmine');
var corejs = require('core-js');


gulp.task('run_route_tests', function() {
  return gulp.src(['src/**/*.js','!src/WebApp/react/**/*.js','!src/WebApp/public/**/*.js','!gulpfile.js', 'tests/node/**/*.js'])
    .pipe(jasmine());
});

gulp.task('run_react_tests', function() {
  
  return gulp.src(['tests/support/react.js' ,'tests/support/reactDOM.js','!gulpfile.js', 'tests/react/**/*.js'])
    .pipe(jasmineBrowser.specRunner({console: true}))
    .pipe(jasmineBrowser.headless({driver: 'chrome'}));
});