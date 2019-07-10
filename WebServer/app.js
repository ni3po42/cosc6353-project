var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var accountLogin = require('./routes/AccountLogin');
var profile = require('./routes/Profile');
var quote = require('./routes/Quote');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

var options = {
    root: path.join(__dirname, 'public')
  }

app.get('*', function(req, res) {
        res.sendFile('./index.html',options); // load the single view file (angular will handle the page changes on the front-end)
    });

app.use('/api/Login', accountLogin);
app.use('/api/Profile', profile);
app.use('/api/Quote', quote);

module.exports = app;
