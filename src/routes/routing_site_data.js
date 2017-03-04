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
});

router.get('/map', function(req, res){
    res.json(
                // [
                // ['City', 'Hits'],
                // ['Cairo, EG',  1000],
                // ['Alexandrea, EG',  1170],
                // ['Giza, EG',  660],
                // ]
                [
                ['Country',   'Population', 'Area'],
                ['Egypt',      2761477,    1285.31],
                ['South Africa',     1324110,    181.76],
                ['Kenya',    959574,     117.27],
                ['Canada',     907563,     130.17],
                ['US',   655875,     158.9],
                ['France',     607906,     243.60],
                ['RU',   380181,     140.7],
                ['UK',  371282,     102.41],
                ['Australia', 67370,      213.44],
                ['Saudi Arabia',     52192,      43.43],
                ['Italy',  38262,      11]
                ]
        );
});

module.exports = router;