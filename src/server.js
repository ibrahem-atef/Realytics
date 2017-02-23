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

app.get("/", function(request, response){
    response.send("Hello World");
})

server.listen(port, '0.0.0.0', function(){
    console.log("listening");
})