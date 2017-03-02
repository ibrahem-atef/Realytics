var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var config = require('../database.js');
 
// set up a mongoose model
var UserSchema = new Schema({
email:
        {
            type: String,
            required:true,
            unique: true
        },

        name: 
        {
            type: String,
            required:false,
            unique:false
        },

        country:
        {
            type: String,
            required: false,
            unique: false
        },

        company:
        {
            type: String,
            required: false,
            unique: false
        },

        business:
        {
            type: String,
            required: false,
            unique: false
        },

        password:
        {
            type: String,
            required: true,
            unique:false
        },

        counter:{
            type: Number,
            required:false,
            unique:false,
            default: 0
        }
});
 
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
 
// 'methods' is used to add an instance method to the model
// 'statics' is used to add a class method
UserSchema.methods.comparePassword = function (pwd, callback) {
    bcrypt.compare(pwd, this.password, function (err, isMatch) {
        if (err) {
            console.log(`User ${this.name} attempt to enter  ${loginPass} that didn't match`);
            this.counter++;
            return callback(err);
        }

        if(this.counter > config.max_login_attempts){
            // still needs testing
            // lock the account
            setTimeout(function(that){that.counter = 0}, config.lock_period * 60 * 1000, this);
            return callback(err);
        }

        callback(null, isMatch);
        console.log(`User: ${this.name} authenticated`);
    });
};
 
module.exports = mongoose.model('User', UserSchema);