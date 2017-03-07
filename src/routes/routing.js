var express     = require('express');
// var app         = express();
var bodyParser  = require("body-parser");
var passport    = require('passport');
var jwt         = require('jwt-simple');
var UserModel   = require('../config/models/user');
var config      = require('../config/database');
var path        = require("path");


var router = express.Router();

router.post('/login', function(req, res, next){
    // res.send('hello');
        UserModel.findOne({email: req.body.email}, function(err, user) {

        if (err) {
            console.log("DB error!");
            throw err;
        }
 
        if (!user) {
            //res.status(403).send({success: false, msg: "Authentication failed, Please sign up first"});
            res.render('../modules/login/login_view.ejs', {error: true, msg:"Authentication failed, Please sign up first"});                        
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if(err){
                    //res.send(err);
                    res.render('../modules/login/login_view.ejs', {error: true, msg:err});                                            
                }
                else if (isMatch) {
                    user.counter = 0;
                    user.save();
                    // if user is found and password is right create a token
                    var token = jwt.encode(user, config.secret);
                    // return the information including token as JSON
                    res.cookie('authorization',token, { maxAge: 900000, httpOnly: false });
                    req.headers.authorization = 'JWT ' + token;
                    // res.redirect('/test');
                    next();
                    //res.json({success: true, token: 'JWT ' + token});
                    var a = 5;
                } else {
                        //res.status(403).send( {success: false, msg: "Authentication failed, Wrong password"} );
                        // res.render(path.join(__dirname, './modules', 'login', 'login_view.ejs'), {error: true, msg:"Authentication failed, Wrong password"});
                        //app.set('views','../modules/login');
                        res.render('../modules/login/login_view.ejs', {error: true, msg:"Authentication failed, Wrong password"});                        
                }
            });
        }
    });
});

router.post('/login',  passport.authenticate('jwt', { session: false}), function(req, res){
    // res.send('redirect')
    // req.method = 'get';
    res.redirect('/dashboard');
});

router.get('/test', function(req, res){
    globale = test;
    res.send("test")
});
 
router.post('/signup', function(req, res) {

    // Should be handeled in client side!
    if (!req.body.email || !req.body.password) {

        res.json({success: false, msg: 'Please fill all fields'});
        
    } else {

        var new_user = new UserModel({
            email     : req.body.email,
            name      : req.body.name,
            country   : req.body.country,
            company   : req.body.company,
            business  : req.body.business,
            password  : req.body.password,
            counter   : 0
        });

    // save Cutomer to DB
    new_user.save(function(err) {
      if (err) {
            //return res.json({success: false, msg: 'Account already exists !'});
            res.render('../modules/Signup/signup_view.ejs', {error: true, msg:"Account already exists !"});                                
        }
        else{
            //res.json({success: true, msg: 'Thank you for registration, you can login now'});
            res.redirect('/login');

        }

    });
  }
});

router.post('/authenticate', function(req, res) {
    UserModel.findOne({email: req.body.email}, function(err, user) {

        if (err) {
            console.log("DB error!");
            throw err;
        }
 
        if (!user) {
            res.status(403).send({success: false, msg: "Authentication failed, Please sign up first"});

        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if(err){
                    res.send(err);
                }
                else if (isMatch) {
                    user.counter = 0;
                    user.save();
                    // if user is found and password is right create a token
                    var token = jwt.encode(user, config.secret);
                    // return the information including token as JSON
                    //res.cookie('Authorization',token, { maxAge: 900000, httpOnly: false });
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.status(403).send( {success: false, msg: "Authentication failed, Wrong password"} );
                }
            });
        }
    });
});

router.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        // these lines seems to be useless as passport authorization already added a req.user
        var decoded = jwt.decode(token, config.secret);
        UserModel.findOne({email: decoded.email}, function(err, user) {

            if (err) {
                console.log("DB Error!");
                throw err;
            }

            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                res.json( {success: true, msg: `Welcome to the members area, ${user.email}`});
                //res.redirect('/test');
            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
}

module.exports = router;