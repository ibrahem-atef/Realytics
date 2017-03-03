var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
// set up a mongoose model
var VisitSchema = new Schema({
        email:
        {
            type: String,
            required: true,
            unique: false
        },

        site:
        {
            type: String,
            required: false,
            unique: false
        },

        browser: 
        {
            type: String,
            required:false,
            unique:false
        },

        device:
        {
            type: String,
            required: false,
            unique: false
        },

        os:
        {
            type: String,
            required: false,
            unique: false
        },

        visit_time:
        {
            type: Date,
            required: false,
            unique:false
        },

        cookie_id:
        {
            type: String,
            required:false,
            unique:false
        },

        location:
        {
            type: String,
            required:false,
            unique:false
        },

        avg_online_time:
        {
            type: Number,
            required:false,
            unique:false,
            default: 0
        }
});

VisitSchema.pre('save', function (next) {
    var visit = this;
    next();
});
 
module.exports = mongoose.model('Visit', VisitSchema);