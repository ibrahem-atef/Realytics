var http = require("http");
var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var server = http.createServer(app);
var io = require("socket.io")(server);
var mongoose = require("mongoose");

var port = 3000;

app.disable('x-powered-by');
app.use(express.static(__dirname + '/public'));

app.get("/", function(request, response){
    // response.send("Hello World");
    response.sendFile(path.join(__dirname, './modules', 'welcome', 'welcome_view.html'));
})

app.get("/login", function(request, response){
    response.sendFile(path.join(__dirname, './modules', 'login', 'login_view.html'));    
})

server.listen(port, '0.0.0.0', function(){
    console.log("listening...");
})