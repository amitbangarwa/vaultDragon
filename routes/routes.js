/*var express = require('express');
var router = express.Router();

/!* GET home page. *!/
router.get('/', function(req, res, next) {
    res.render('index.html', { title: 'Express' });
});

router.get('/users', function(req, res, next) {
    res.render('user', {name: 'Amit'});
});*/

module.exports = app => {
    app.get('/', (req, res) => {
        res.render('index.html');
    });

    app.get('/home', (req, res) => {
        res.render('home.html');
    });

    app.get('/error', (req, res) => {
        res.render('error.html');
    });
};
