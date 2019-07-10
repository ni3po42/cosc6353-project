var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var options = {
    root: path.join(__dirname, 'public')
  }

router.get('*', function(req, res) {
        res.sendFile('./index.html',options); // load the single view file (angular will handle the page changes on the front-end)
    });


module.exports = router;
