var express = require('express');
var router = express.Router();
var app = express();

var passport = require("passport");

var mail = require('../services/mailing');

var testModel = require('../models/testModel.js');


function isLoggedIn(req, res, next) {
	  if(req.isAuthenticated()) {
	    return next();
	  }
	  return res.redirect('/login');
	}

function isRole(req, res, next) {
	 // if(req.isAuthenticated()) {
	    
		  if(req.user.role == 1){
			  return next();
			}
		
	//  }
	  return res.redirect('/');
	}










/* GET home page. */
router.get('/', function(req, res, next) {
	
	var m = new testModel();
	if(req.user){
	   
		m.user = req.user;
	   m.name = req.user.email;
	}
	
  res.render('owl/index',  { model: m  , layout: '/layouts/layout.hbs' });
});







router.post('/pp', function(req, res) {

	mail.testSend ();

    res.send('ssss');
});








module.exports = router;