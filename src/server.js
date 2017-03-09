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
var miner       = require('./routes/miner.js');
var ejs         = require("ejs");
var useragent   = require('express-useragent');



// this is a comment again
var port = process.env.PORT || config.port;

// get our request parameters
app.use(cookie());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(useragent.express());

app.set("view engine", "ejs");
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
app.use("/api", miner);

app.get('/cookie', function(req, res){
    res.cookie('cookieName',1111, { maxAge: 900000, httpOnly: false });
    res.send("hii");
})

app.get("/testejs", function(req, res){
    res.render(path.join(__dirname, './modules', 'login', 'login_view.ejs'), {error: "true", msg:"message"}); 
});

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
    response.render(path.join(__dirname, './modules', 'login', 'login_view.ejs'), {error: false, msg:""});
});

router.get("/signup", function(request, response){
    response.render(path.join(__dirname, './modules', 'signup', 'signup_view.ejs'), {error:false, msg:""});    
});

// serve static files for the angular app 'module' dashboard
app.use('/dashboard', express.static(__dirname + '/modules/dashboard'));

// dashboard routing without authnetication
app.get('/dashboard', function(req,res){
    res.sendFile(path.join(__dirname, '/modules' , '/dashboard', 'MainPage.html'));
});

// this route handles all remaining routes that are not handled by any app/router get/post
app.use(function(req, res){
    // res.send('not handled route');
    res.redirect("/");
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