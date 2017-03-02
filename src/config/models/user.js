var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
 
// set up a mongoose model
var UserSchema = new Schema({
  name: {
        type: String,
        unique: true,
        required: true
    },
  password: {
        type: String,
        required: true
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
UserSchema.methods.comparePassword = function (passw, resultFunc) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return resultFunc(err);
        }
        resultFunc(null, isMatch);
    });
};
 
module.exports = mongoose.model('User', UserSchema);