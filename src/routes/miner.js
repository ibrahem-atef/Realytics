var express     = require('express');
var Router = express.Router();
var config      = require('../config/database');
var VisitModel   = require('../config/models/visit');
var passport    = require('passport');

Router.get("/loggedin", passport.authenticate("jwt", {session: false}), function(req, res){
    res.json({loggedin: true});
    res.send();
});

Router.get("/total_hits/:site_name", passport.authenticate("jwt", {session: false}), function(req, res){
    if(req.params.site_name){
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

Router.get(["/unique_hits/:site_name", "/unique_hits"], passport.authenticate("jwt", {session: false}), function(req, res){
    if(req.params.site_name){
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

Router.get(["/browsers/:site_name", "/browsers"], passport.authenticate("jwt", {session: false}), function(req, res){
    var headers = ["Browser", "Users"];
    if(req.params.site_name){
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
    if(req.params.site_name){
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
                    result = ConvertToArray(result);
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
                    result = ConvertToArray(result);
                    result = ConvertToArray(result, headers);                
                    res.json(result);
                }
        });
    }
});

Router.get(["/locations/:site_name", "/locations"], passport.authenticate("jwt", {session: false}), function(req, res){
    var headers = ["Location", "Users"];    
    if(req.params.site_name){
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
    if(req.params.site_name){
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


module.exports = Router;