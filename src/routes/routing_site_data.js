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
        
        );
})

module.exports = router;