// require it once to add the testing visits data
// require('./config/init_testing_visits_data.js');


var http        = require("http");
var morgan      = require("morgan");
var express     = require("express");
var app         = express();
var path        = require("path");
var bodyParser  = require("body-parser");
var server      = http.createServer(app);
var io          = require("socket.io")(server);
var mongoose    = require("mongoose");
var passport    = require('passport');
var jwt         = require('jwt-simple');
var UserModel   = require('./config/models/user');
var config      = require('./config/database');
var router      = require('./routes/routing.js');
var router_site_data
                = require('./routes/routing_site_data.js');
var cookie      = require('cookie-parser');


// this is a comment again
var port = process.env.PORT || config.port;

// get our request parameters
app.use(cookie());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.disable('x-powered-by');
app.use(express.static(__dirname + '/public'));

// connect to database
mongoose.connect(config.database);

app.use(morgan("dev"));

// pass passport for configuration
app.use(passport.initialize());
// app.use(require('passport-session'));
require('./config/passport')(passport);

app.use('/', router);
app.use('/site_data', router_site_data);
app.get('/cookie', function(req, res){
    res.cookie('cookieName',1111, { maxAge: 900000, httpOnly: false });
    res.send("hii");
})

// roue for home page
router.get("/", function(request, response){
    // response.send("Hello World");
    response.sendFile(path.join(__dirname, './modules', 'welcome', 'welcome_view.html'));
});

router.post("/", function(request, response){
    // response.send("Hello World");
    // var body = JSON.parse(request.body);
    response.sendFile(path.join(__dirname, './modules', 'welcome', 'welcome_view.html'));
});

router.get("/login", function(request, response){
    response.sendFile(path.join(__dirname, './modules', 'login', 'login_view.html'));    
});

// serve static files for the angular app 'module' dashboard
app.use('/dashboard', express.static(__dirname + '/modules/dashboard'));

// dashboard routing without authnetication
app.get('/dashboard', function(req,res){
    res.sendFile(path.join(__dirname, '/modules' , '/dashboard', 'index.html'));
});

//Other routes here
app.use(function(err, req, res, next){
    if(err.statusCode){
        // if he reached this part because of an error
        res.type('txt').send('an error happened');
    }else{
        // if he reached this part because of an invalid url
        // the error handling part needs improvements
        // res.type('txt').send('Sorry, this is an invalid URL.');
        res.send();
    }
});

server.listen(port, '0.0.0.0', function(){
    console.log("listening...");
})