var express     = require('express');

var Router = express.Router();

var config      = require('../config/database');

var VisitModel   = require('../config/models/visit');



Router.get("/total_hits", function(req, res){

    VisitModel.count({} , function(err, number) {

        if(err){ 

            console.log("Cannot retreive data from database"); 

            res.send("Sorry, Internal database error!")

        }

        res.json(["NumberOfHits", number]);

    });

});



Router.get("/unique_hits", function(req, res){

    VisitModel.distinct("cookie_id" , function(err, array) {

        if(err){ 

            console.log("Cannot retreive data from database"); 

            res.send("Sorry, Internal database error!")

        }

        res.json(["UniqueNumberOfHits", array.length]);

    });

});



Router.get("/browsers/:site_name", function(req, res){

    var headers = ["Browser", "Users"];

    VisitModel.aggregate([

            {

                $match : 

                { 

                    site : req.params.site_name

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

});



Router.get("/os/:site_name", function(req, res){

    var headers = ["Operating System", "Users"];    

    VisitModel.aggregate([

           {

                $match : 

                { 

                    site : req.params.site_name

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

});



Router.get("/locations/:site_name", function(req, res){

    var headers = ["Location", "Users"];    

    VisitModel.aggregate([

            {

                $match : 

                { 

                    site : req.params.site_name

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

});



Router.get("/devices/:site_name", function(req, res){

    var headers = ["Device", "Users"];

    VisitModel.aggregate([

            {

                $match : 

                { 

                    site : req.params.site_name

                } 

            }, 

            { 

                $group: 

                {

                    _id:"$browser", 

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

    // return (JSON.stringify(result, null, 4));

}





// function ConvertToArray(ArrObj){

//     var endData = {};

//     for (var i = 0; i < ArrObj.length; ++i) {

//         var date = ArrObj[i].device;

//         if (endData[ArrObj] === undefined)

//             endData[ArrObj] = [];

//         endData[ArrObj].push(ArrObj[i].device);

//     }

//     var finalData = [];

//     for (var ed in endData) {

//         var a = [ed];

//         for (var i = 0; i < endData[ed].length; ++i) {

//             a.push(endData[ed][i]);

//         }

//         finalData.push(a);

//     }

//     return finalData;

// }





module.exports = Router;



// [

//     [browser],

//     [firefox],

//     [chrome],

//     [safari]



// ]



// [[browser],[firefox],[chrome],[safari]]