var express     = require('express');
var bodyParser  = require("body-parser");
var passport    = require('passport');
var jwt         = require('jwt-simple');
var UserModel   = require('../config/models/user');
var config      = require('../config/database');

var router = express.Router();

// default route
router.get('/', function(req, res){
    res.json(
                [
                ['Year', 'Sales', 'Expenses'],
                ['2013',  1000,      400],
                ['2014',  1170,      460],
                ['2015',  660,       1120],
                ['2016',  1030,      540]
                ]
        );
})

module.exports = router;