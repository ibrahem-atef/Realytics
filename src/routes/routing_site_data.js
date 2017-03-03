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
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor1', location: 'cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor1', location: 'cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor1', location: 'cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor1', location: 'cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor1', location: 'cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor1', location: 'cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor1', location: 'cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor1', location: 'cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor1', location: 'cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor1', location: 'cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor1', location: 'cairo', avg_online_time: 1200}
        ]
        );
})

module.exports = router;