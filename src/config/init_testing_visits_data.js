// --------------------------------------------------------------------
// this file is only used manually to add some testing data into the DB
// require it once to add the data
// --------------------------------------------------------------------


var config      = require('../config/database');
var mongoose    = require('mongoose');
var VisitModel  = require('./models/visit');


var data = 
    [
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor1', location: 'Cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'safari', device: 'mobile', os: 'ios', visit_time: Date.now(), cookie_id: 'visitor2', location: 'Cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'chrome', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor3', location: 'Cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'edge', device: 'desktop', os: 'win10', visit_time: Date.now(), cookie_id: 'visitor4', location: '', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'IE', device: 'desktop', os: 'win8', visit_time: Date.now(), cookie_id: 'visitor5', location: 'Cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'desktop', os: 'win7', visit_time: Date.now(), cookie_id: 'visitor6', location: 'Cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'desktop', os: 'win7', visit_time: Date.now(), cookie_id: 'visitor6', location: 'Giza', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor7', location: 'Cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'chrome', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor7', location: 'Giza', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'desktop', os: 'win10', visit_time: Date.now(), cookie_id: 'visitor8', location: 'Cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'chrome', device: 'desktop', os: 'win10', visit_time: Date.now(), cookie_id: 'visitor8', location: 'Alex', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'desktop', os: 'win10', visit_time: Date.now(), cookie_id: 'visitor8', location: 'Alex', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'IE', device: 'mobile', os: 'win7', visit_time: Date.now(), cookie_id: 'visitor10', location: 'Cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'desktop', os: 'mint', visit_time: Date.now(), cookie_id: 'visitor9', location: 'Alex', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'chrome', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor11', location: 'Alex', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'chrome', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor11', location: 'Giza', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'safari', device: 'mobile', os: 'ios', visit_time: Date.now(), cookie_id: 'visitor12', location: 'Alex', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'safari', device: 'desktop', os: 'osx', visit_time: Date.now(), cookie_id: 'visitor13', location: 'Alex', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor14', location: 'Alex', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'desktop', os: 'win8', visit_time: Date.now(), cookie_id: 'visitor15', location: 'Giza', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'edge', device: 'desktop', os: 'win10', visit_time: Date.now(), cookie_id: 'visitor16', location: 'Alex', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'desktop', os: 'win10', visit_time: Date.now(), cookie_id: 'visitor17', location: 'Cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor1', location: 'Cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'safari', device: 'mobile', os: 'ios', visit_time: Date.now(), cookie_id: 'visitor2', location: 'Cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'chrome', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor3', location: 'Cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'edge', device: 'desktop', os: 'win10', visit_time: Date.now(), cookie_id: 'visitor4', location: 'Alex', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'IE', device: 'desktop', os: 'win8', visit_time: Date.now(), cookie_id: 'visitor5', location: 'Cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'desktop', os: 'win7', visit_time: Date.now(), cookie_id: 'visitor6', location: 'Cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'desktop', os: 'win7', visit_time: Date.now(), cookie_id: 'visitor6', location: 'Giza', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor7', location: 'Cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'chrome', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor7', location: 'Giza', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'desktop', os: 'win10', visit_time: Date.now(), cookie_id: 'visitor8', location: 'Cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'chrome', device: 'desktop', os: 'win10', visit_time: Date.now(), cookie_id: 'visitor8', location: 'Alex', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'desktop', os: 'win10', visit_time: Date.now(), cookie_id: 'visitor8', location: 'Alex', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'IE', device: 'mobile', os: 'win7', visit_time: Date.now(), cookie_id: 'visitor10', location: 'Cairo', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'desktop', os: 'mint', visit_time: Date.now(), cookie_id: 'visitor9', location: 'Alex', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'chrome', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor11', location: 'Alex', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'chrome', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor11', location: 'Giza', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'safari', device: 'mobile', os: 'ios', visit_time: Date.now(), cookie_id: 'visitor12', location: 'Alex', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'safari', device: 'desktop', os: 'osx', visit_time: Date.now(), cookie_id: 'visitor13', location: 'Alex', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'mobile', os: 'android', visit_time: Date.now(), cookie_id: 'visitor14', location: 'Alex', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'desktop', os: 'win8', visit_time: Date.now(), cookie_id: 'visitor15', location: 'Giza', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'edge', device: 'desktop', os: 'win10', visit_time: Date.now(), cookie_id: 'visitor16', location: 'Alex', avg_online_time: 1200},
        {email: 'ibrahematef@gmail.com', site: 'ABC.com', browser: 'firefox', device: 'desktop', os: 'win10', visit_time: Date.now(), cookie_id: 'visitor17', location: 'Cairo', avg_online_time: 1200}
    ];

// connect to database
mongoose.connect(config.database);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    for(visit of data){
        var new_visit = new VisitModel(visit);
        new_visit.save();
    }

});


console.log("done adding testing data to the DB");