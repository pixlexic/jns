var express = require('express');
var router = express.Router();
var app = express();

var helpers = require('../services/helpers');
var pdfService = require('../services/pdfService');
var _db = require('../repositories/dbSqlite');


var _om = require('../models/jnsTest/jnsOrderModel');

var pageModel = require('../models/pageModel.js');



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



/* GET index page. */
router.get('/', getBreadcrumbs, function(req, res, next) {

   // pdfService.test();


    var m = new pageModel();
    m.PageId = 'Samples';
    m.breadCrumb = req.breadcrumbs;

    res.render('samples/index', { model: m, layout: '/layouts/layout.hbs' });
});




/* GET index page. */
router.get('/sales', getBreadcrumbs, async function(req, res, next) {


    let re = await _db.getUserData(1); 

console.log(re);
console.log('xxx');

    var m = new pageModel();
    m.PageId = 'Samples';
    m.breadCrumb = req.breadcrumbs;

    res.render('samples/sales', { model: m, um : re,  layout: '/layouts/layout.hbs' });
});


module.exports = router;