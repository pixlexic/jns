var express = require('express');
var router = express.Router();
var app = express();

var passport = require("passport");

var mail = require('../services/mailing');

var _db = require('../repositories/dbMySQLRepo');





/* GET test */
router.get('/orders', async (req, res, next) => {

    try {
     
        let re =  await _db.getOrders(); 
        res.json({ data: re });   
      } catch (e) {
        //todo
        next(e) 
      }



});




/* POST test */
router.post('/ordersP', async (req, res, next) => {

console.log("params: " + req.query.bb);

    try {
        let re =  await _db.getOrders(); 
        res.json({ data: re });   
      } catch (e) {
        //todo
        next(e) 
      }



});




module.exports = router;