var express     = require('express');
var Router      = express.Router();
var config      = require('../config/database');
var VisitModel  = require('../config/models/visit');
var passport    = require('passport');
var atob        = require('atob');

// global.Buffer = global.Buffer || require('buffer').Buffer;

// if (typeof btoa === 'undefined') {
//   global.btoa = function (str) {
//     return new Buffer(str).toString('base64');
//   };
// }

// if (typeof atob === 'undefined') {
//   global.atob = function (b64Encoded) {
//     return new Buffer(b64Encoded, 'base64').toString();
//   };
// }

// Router.get("/", function(req, res){
//     res.json();
// });

Router.get("/hit/:b64_obj", function(req, res){
    // var data = getData(req);
    // res.json({loggedin: true});
    var obj = JSON.parse(frombase64url(req.params.b64_obj));
    var user_device = req.useragent.isDesktop == true ? "desktop" : "mobile";
    var visitor_id = req.cookies['realytics_user_id']
    if(!visitor_id){
        visitor_id = Date.now() + "ip";
        res.cookie('realytics_user_id',visitor_id, { maxAge: 900000, httpOnly: false });
    }


    var new_visit = new VisitModel({
        email     : obj.email,
        site      : obj.site.toLowerCase(),
        device    : user_device,
        os        : req.useragent.os,
        browser   : req.useragent.browser,
        visit_time: Date.now(),
        cookie_id : "0",
        location  : "London",
        avg_online_time : "0"

    });
    
    new_visit.save();

    res.send();
});

function frombase64url(x) {
    return atob(x.replace(/-/g,'+').replace(/_/g, '/'));
}

Router.get("/loggedin", passport.authenticate("jwt", {session: false}), function(req, res){
    res.json({loggedin: true});
    res.send();
});

Router.get("/user_name", passport.authenticate("jwt", {session: false}), function(req, res){
    res.json({name: req.user.name, email:req.user.email});
    res.send();
});

Router.get("/hits_14/:site_name", passport.authenticate("jwt", {session: false}), function(req, res){
    if(req.params.site_name != "all"){
        VisitModel.count( { email: req.user.email, "visit_time": { $gte: (new Date((new Date()).getTime() - (14 * 24 * 60 * 60 * 1000))) } , "site": req.params.site_name } , function(err, number) {
            if(err){ 
                console.log("Cannot retreive data from database"); 
                res.send("Sorry, Internal database error!")
            }
            res.json(number);
        });
    }
    else{
        VisitModel.count( { email: req.user.email, "visit_time": { $gte: (new Date((new Date()).getTime() - (14 * 24 * 60 * 60 * 1000))) } } , function(err, number) {
            if(err){ 
                console.log("Cannot retreive data from database"); 
                res.send("Sorry, Internal database error!")
            }
            res.json(number);
        });
    }
});

Router.get("/total_hits/:site_name", passport.authenticate("jwt", {session: false}), function(req, res){
    if(req.params.site_name != "all"){
        VisitModel.count({"site": req.params.site_name, email: req.user.email} , function(err, number) {
            if(err){ 
                console.log("Cannot retreive data from database"); 
                res.send("Sorry, Internal database error!")
            }
            res.json(number);
        });
    }
    else{
        VisitModel.count({email: req.user.email} , function(err, number) {
            if(err){ 
                console.log("Cannot retreive data from database"); 
                res.send("Sorry, Internal database error!")
            }
            res.json(number);
        });
    }
});

Router.get(["/unique_14/:site_name", "/unique_hits"], passport.authenticate("jwt", {session: false}), function(req, res){
    if(req.params.site_name != "all"){
        VisitModel.distinct("cookie_id", {"site": req.params.site_name, "email": req.user.email, "visit_time": { $gte: (new Date((new Date()).getTime() - (14 * 24 * 60 * 60 * 1000))) }}, function(err, result) {
            if(err){ 
                console.log("Cannot retreive data from database"); 
                res.send("Sorry, Internal database error!")
            }
            res.json(result.length);
        });
    }
    else{
        VisitModel.distinct("cookie_id", {"email": req.user.email, "visit_time": { $gte: (new Date((new Date()).getTime() - (14 * 24 * 60 * 60 * 1000))) }}, function(err, result) {
            if(err){ 
                console.log("Cannot retreive data from database"); 
                res.send("Sorry, Internal database error!");
            }
            res.json(result.length);
        });
    }
});

Router.get(["/unique_hits/:site_name", "/unique_hits"], passport.authenticate("jwt", {session: false}), function(req, res){
    if(req.params.site_name != "all"){
        VisitModel.distinct("cookie_id", {"site": req.params.site_name, "email": req.user.email}, function(err, result) {
            if(err){ 
                console.log("Cannot retreive data from database"); 
                res.send("Sorry, Internal database error!")
            }
            res.json(result.length);
        });
    }
    else{
        VisitModel.distinct("cookie_id", {"email": req.user.email}, function(err, result) {
            if(err){ 
                console.log("Cannot retreive data from database"); 
                res.send("Sorry, Internal database error!");
            }
            res.json(result.length);
        });
    }
});

Router.get("/sites", passport.authenticate("jwt", {session: false}), function(req, res){
    VisitModel.distinct("site", {email: req.user.email} , function(err, arr) {
        if(err){ 
            console.log("Cannot retreive data from database"); 
            res.send("Sorry, Internal database error!")
        }
        // arr = ConvertToArray(arr, headers); 

        // This output is not the same form of array of arrays
        res.json(arr);
    });
});

Router.get(["/visits_chart/:site_name", "/visits_chart"], passport.authenticate("jwt", {session: false}), function(req, res){
    var headers = ["Date", "Hits"];
    if(req.params.site_name != "all"){
        VisitModel.aggregate([
        {
            $match : 
            { 
                site : req.params.site_name,
                email: req.user.email,
                "visit_time": { $gte: (new Date((new Date()).getTime() - (14 * 24 * 60 * 60 * 1000))) }
            } 
        }, 
        { 
            $group: 
            {
                _id:"$visit_time", 
                number: {$sum: 1}
            } 
        },
        {
            $project: 
            {
                _id: { $dateToString: { format: "%m-%d", date: "$_id" } },
                number: "$number"
    
            }
        }
        ], function (err, result) {
                if (err) {
                    console.log("Cannot retreive data from database"); 
                    res.send("Sorry, Internal database error!")
                } else {
                    result = ConvertToArray(result, headers);                
                    res.json(result);
                }
        });
    }
    else{
        VisitModel.aggregate([
        {
            $match : 
            { 
                email: req.user.email,
                "visit_time": { $gte: (new Date((new Date()).getTime() - (14 * 24 * 60 * 60 * 1000))) }
            } 
        }, 
        { 
            $group: 
            {
                _id:"$visit_time", 
                number: {$sum: 1}
            } 
        },
        {
            $project: 
            {
                _id: { $dateToString: { format: "%m-%d", date: "$_id" } },
                number: "$number"
    
            }
        }
        ], function (err, result) {
                if (err) {
                    console.log("Cannot retreive data from database"); 
                    res.send("Sorry, Internal database error!")
                } else {
                    result = ConvertToArray(result, headers);                
                    res.json(result);
                }
        });
    }
});

Router.get(["/browsers/:site_name", "/browsers"], passport.authenticate("jwt", {session: false}), function(req, res){
    var headers = ["Browser", "Users"];
    if(req.params.site_name != "all"){
        VisitModel.aggregate([
        {
            $match : 
            { 
                site : req.params.site_name,
                email: req.user.email
            } 
        }, 
        { 
            $group: 
            {
                _id:"$browser", 
                number: {$sum: 1}
            } 
        }
        ], function (err, result) {
                if (err) {
                    console.log("Cannot retreive data from database"); 
                    res.send("Sorry, Internal database error!")
                } else {
                    result = ConvertToArray(result, headers);                
                    res.json(result);
                }
        });
    }
    else{
        VisitModel.aggregate([
        {
            $match : 
            { 
                email: req.user.email
            } 
        }, 
        { 
            $group: 
            {
                _id:"$browser", 
                number: {$sum: 1}
            } 
        }
        ], function (err, result) {
                if (err) {
                    console.log("Cannot retreive data from database"); 
                    res.send("Sorry, Internal database error!")
                } else {
                    result = ConvertToArray(result, headers);                
                    res.json(result);
                }
        });
    }
});

Router.get(["/os/:site_name", "/os"], passport.authenticate("jwt", {session: false}), function(req, res){
    var headers = ["Operating System", "Users"];    
    if(req.params.site_name != "all"){
        VisitModel.aggregate([
        {
            $match : 
            { 
                site : req.params.site_name,
                email: req.user.email
            } 
        }, 
        { 
            $group: 
            {
                _id:"$os", 
                number: {$sum: 1}
            } 
        }
        ], function (err, result) {
                if (err) {
                    console.log("Cannot retreive data from database"); 
                    res.send("Sorry, Internal database error!")
                } else {
                    // result = ConvertToArray(result);
                    result = ConvertToArray(result, headers);                
                    res.json(result);
                }
        });
    }
    else{
        VisitModel.aggregate([
        {
            $match : 
            { 
                email: req.user.email
            } 
        }, 
        { 
            $group: 
            {
                _id:"$os", 
                number: {$sum: 1}
            } 
        }
        ], function (err, result) {
                if (err) {
                    console.log("Cannot retreive data from database"); 
                    res.send("Sorry, Internal database error!")
                } else {
                    // result = ConvertToArray(result);
                    result = ConvertToArray(result, headers);                
                    res.json(result);
                }
        });
    }
});

Router.get(["/locations/:site_name", "/locations"], passport.authenticate("jwt", {session: false}), function(req, res){
    var headers = ["Location", "Users"];    
    if(req.params.site_name != "all"){
        VisitModel.aggregate([
        {
            $match : 
            { 
                site : req.params.site_name,
                email:req.user.email
            } 
        }, 
        { 
            $group: 
            {
                _id:"$location", 
                number: {$sum: 1}
            } 
        }
        ], function (err, result) {
                if (err) {
                    console.log("Cannot retreive data from database"); 
                    res.send("Sorry, Internal database error!")
                } else {
                    result = ConvertToArray(result, headers);                
                    res.json(result);
                }
        });
    }
    else{
        VisitModel.aggregate([
        {
            $match : 
            { 
                email:req.user.email
            } 
        }, 
        { 
            $group: 
            {
                _id:"$location", 
                number: {$sum: 1}
            } 
        }
        ], function (err, result) {
                if (err) {
                    console.log("Cannot retreive data from database"); 
                    res.send("Sorry, Internal database error!")
                } else {
                    result = ConvertToArray(result, headers);                
                    res.json(result);
                }
        });
    }
});

Router.get(["/devices/:site_name", "/devices"], passport.authenticate("jwt", {session: false}), function(req, res){
    var headers = ["Device", "Users"];
    if(req.params.site_name != "all"){
        VisitModel.aggregate([
        {
            $match : 
            { 
                site : req.params.site_name,
                email: req.user.email
            } 
        }, 
        { 
            $group: 
            {
                _id:"$device", 
                count: {$sum: 1}
            }
        }
        ], function (err, result) {
                if (err) {
                    console.log("Cannot retreive data from database"); 
                    res.send("Sorry, Internal database error!")
                } else {
                    result = ConvertToArray(result, headers);
                    res.json(result);
                }
        });
    }
    else{  
        VisitModel.aggregate([
        {
            $match : 
            { 
                email: req.user.email
            } 
        }, 
        { 
            $group: 
            {
                _id:"$device", 
                count: {$sum: 1}
            }
        }
        ], function (err, result) {
                if (err) {
                    console.log("Cannot retreive data from database"); 
                    res.send("Sorry, Internal database error!")
                } else {
                    result = ConvertToArray(result, headers);
                    res.json(result);
                }
        });
    }
});

function ConvertToArray(arrKey, headers){
    var i = 0, result = [];
    while(i < arrKey.length){
        result.push([]);
        for(var key in arrKey[i]){
            result[i].push(arrKey[i][key])
        }
        i++;
    }
    result.push(headers);
    return result.reverse();
}

Router.get("/add_site", passport.authenticate("jwt", {session: false}), function(req, res){
    var user_device = req.useragent.isDesktop == true ? "desktop" : "mobile";
    var new_visit = new VisitModel({
        email     : req.user.email,
        site      : req.headers.site_name.toLowerCase(),
        device    : user_device,
        os        : req.useragent.os,
        browser   : req.useragent.browser,
        visit_time: Date.now(),
        cookie_id : "0",
        location  : "London",
        avg_online_time : "0"

    });

    // save to DB
    VisitModel.count( { email: req.user.email, site: req.headers.site_name.toLowerCase() }, function(err, number) {
        if(err){ 
            // console.log("Cannot retreive data from database"); 
            res.send("Sorry, Internal database error!")
        }

        if(number == 0)
        {
            new_visit.save();
            res.json({success: true});
        }
        else
            res.json();
    });
});

module.exports = Router;