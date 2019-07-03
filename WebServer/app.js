var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var staticPath = path.join(__dirname, 'public');

app.use(express.static(staticPath));

//app.use('*', indexRouter);

var options = {
    root:staticPath
  }

app.get('*', function(req, res) {
        res.sendFile('./index.html',options); // load the single view file (angular will handle the page changes on the front-end)
    });


module.exports = app;
