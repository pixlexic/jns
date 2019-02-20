var express = require('express');
var router = express.Router();
var app = express();

var pageModel = require('../models/pageModel.js');

/* GET index page. */
router.get('/', function(req, res, next) {

    var m = new pageModel();
    m.PageId = 'Apps';

    res.render('webapps/index', { model: m, layout: '/layouts/layout.hbs' });
});



module.exports = router;