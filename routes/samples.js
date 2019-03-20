var express = require('express');
var router = express.Router();
var app = express();

var helpers = require('../services/helpers');
var pdfService = require('../services/pdfService');

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

    pdfService.test();


    var m = new pageModel();
    m.PageId = 'Samples';
    m.breadCrumb = req.breadcrumbs;

    res.render('samples/index', { model: m, layout: '/layouts/layout.hbs' });
});




/* GET index page. */
router.get('/sales', getBreadcrumbs, function(req, res, next) {

    var m = new pageModel();
    m.PageId = 'Samples';
    m.breadCrumb = req.breadcrumbs;

    res.render('samples/sales', { model: m, layout: '/layouts/layout.hbs' });
});


module.exports = router;