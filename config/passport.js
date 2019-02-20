// config/passport.js

var dB = require('../repositories/dbRepo');

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User            = require('../models/user');
var bcrypt   = require('bcrypt-nodejs');


// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
    	console.log('yay');
    	console.dir(user);
        done(null, user);
    });

  //used to deserialize the user from the session 
    passport.deserializeUser(function(user, done) { 
        done(null, user); 
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'user',
        passwordField : 'password', 
        emailField : 'email',
        passReqToCallback : true // allows us to pass back the entire request to the callback
      //  emailField : 'email'
    },
    function(req, user, password, email, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
        
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        	
        	
            // if there is no user with that email
            // create the user
            var newUser  = new User();

        	console.log('eee' + email);
        	dB.setUser(user, email, newUser.generateHash(password));
        	/*
        	
        User.findOne({ 'local.email' :  email }, function(err, user) {
        	
        	console.log('signup!');
        	
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                // if there is no user with that email
                // create the user
                var newUser            = new User();

                // set the user's local credentials
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    
*/
        	
        	
        	
        });

    }));

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, user, password, email, done) {
    	console.log('login!');
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
        
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        	
        	var ret = dB.check(email).then(result => {
    		  console.dir(result.recordset[0].password);
    		  
    		  
    		  
    		  
    		 	console.log(newUser);
    		     
    		     
    	            try{
    	            	
    	            const isValid = bcrypt.compareSync(password, result.recordset[0].password);

    	            if (isValid) {
    	            	   var newUser  = new User();
    	            	   newUser.id = result.recordset[0].userid;
    	            	   newUser.username = result.recordset[0].username;
    	            	   newUser.email = result.recordset[0].email;
    	            	   newUser.isAdmin = result.recordset[0].isadmin;
    	            	   
    	                // user
    	                return done(null, newUser);
    	              }
    	              else {
    	                // password is invalid
    	                return done(null, false, {
    	                  message: 'Invalid username or password',
    	                });
    	              }
    	            
    	            
    	        //	dB.setUser(email, newUser.generateHash(password));
    	      	
    	        	
    	            } catch(errr){console.log(errr)}
    		  
    		  
    		  
    		  
    		  
    		  
    		    
    	  }).catch(err => {
    	      // ... error checks
    		  console.log(err);
    	  })
    	 
        	

        	console.log('WEEEEEEEE');
        	 //  console.dir(ret.recordset[0].password)
        	
        	
        	
        	
        	
      
        	/*
        	//console.log(ret.recordset);
            // if there is no user with that email
            // create the user
            var newUser  = new User();
            try{
            	console.log('validate');
            const isValid = bcrypt.compareSync(password, ret.password);

            if (isValid) {
            
                // user
                return done(null, newUser);
              }
              else {
                // password is invalid
                return done(null, false, {
                  message: 'Invalid username or password',
                });
              }
            
            
        //	dB.setUser(email, newUser.generateHash(password));
      	
        	
            } catch(errr){console.log(errr)}
        */
        
        });

        
        
        
        
        
        
    }));
    
    
    
    
    
    
    
    
    
};
