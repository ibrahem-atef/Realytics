var http        = require("http");
var express     = require("express");
var app         = express();
var path        = require("path");
var bodyParser  = require("body-parser");
var server      = http.createServer(app);
var io          = require("socket.io")(server);
var mongoose    = require("mongoose");
var passport    = require('passport');
var jwt         = require('jwt-simple');
var UserModel        = require('./config/models/user');
var config      = require('./config/database');

var port = process.env.PORT || 3000;

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.disable('x-powered-by');
app.use(express.static(__dirname + '/public'));

// connect to database
mongoose.connect(config.database);

// pass passport for configuration
require('./config/passport')(passport);

app.get("/", function(request, response){
    // response.send("Hello World");
    response.sendFile(path.join(__dirname, './modules', 'welcome', 'welcome_view.html'));
})

app.post("/", function(request, response){
    // response.send("Hello World");
    // var body = JSON.parse(request.body);
    response.sendFile(path.join(__dirname, './modules', 'welcome', 'welcome_view.html'));
})

app.get("/login", function(request, response){
    response.sendFile(path.join(__dirname, './modules', 'login', 'login_view.html'));    
})
 
app.post('/signup', function(req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new UserModel({
      name: req.body.name,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

app.post('/authenticate', function(req, res) {
  UserModel.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;
 
    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

app.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    UserModel.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. UserModel not found.'});
        } else {
          res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
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
};

server.listen(port, '0.0.0.0', function(){
    console.log("listening...");
})