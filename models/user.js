// app/models/user.js
// load the things we need
//var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');


	
var userSchema = function () {
	this.username = null;
	this.email = null;
	this.password = null;
	this.id = 0;
	this.isAdmin = 0;
	
	this.role = 0;
	
	this.socketCount = 0;
	
	
	  return this;
	}

/*
// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});
*/

// methods ======================
// generating a hash
userSchema .prototype.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema .prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
//module.exports = mongoose.model('User', userSchema);






module.exports = userSchema;
