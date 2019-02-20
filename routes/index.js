var express = require('express');
var router = express.Router();
var app = express();

var passport = require("passport");


var testModel = require('../models/testModel.js');


var pageModel = require('../models/pageModel.js');


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
}

function isRole(req, res, next) {
    // if(req.isAuthenticated()) {

    if (req.user.role == 1) {
        return next();
    }

    //  }
    return res.redirect('/');
}


function getBreadcrumbs(req, res, next) {
    const urls = req.originalUrl.split('/');
    urls.shift();
    req.breadcrumbs = urls.map((url, i) => {
        return {
            breadcrumbName: (url === '' ? 'Home' : url.charAt(0).toUpperCase() + url.slice(1)),
            breadcrumbUrl: `/${urls.slice(0, i + 1).join('/')}`,
        };
    });
    next();
}









/* GET home page. */
router.get('/', function(req, res, next) {

    var m = new pageModel();
    m.PageId = 'Home';



    if (req.user) {

        m.user = req.user;
        m.name = req.user.email;
    }

    res.render('index', { model: m, layout: '/layouts/layout.hbs' });
});


/* GET home page. */
router.get('/register', function(req, res, next) {
    res.render('register', { model: testModel, layout: '/layouts/layout.hbs' });
});


/*
router.get('/login', function(req, res, next) {
    res.render('login', { model: testModel, layout: '/layouts/layout.hbs' });
});
*/


//router.get('/contact', isLoggedIn, isRole, function(req, res, next) {
router.get('/contact', getBreadcrumbs, function(req, res, next) {
    var m = new pageModel();
    m.PageId = 'Contact';
    m.breadCrumb = req.breadcrumbs;

    res.render('contact', { model: m, layout: '/layouts/layout.hbs' });


});




// process the login form
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/error', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));




router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/error', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));




module.exports = router;