var express = require('express');
var router = express.Router();
var app = express();

var passport = require("passport");

var mail = require('../services/mailing');

var _db = require('../repositories/dbMySQLRepo');

var _om = require('../models/jnsTest/jnsOrderModel');



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
      //  let re =  await _db.getOrders(); 
        
let re = [];

      let ords = new _om();
      ords.orderId = 0111111;
      ords.po = 'testpo1';
      ords.shipTo = "Dave's Pizza";
      ords.addressOne = '34 Horton Dr';
      ords.addressTwo = null;
      ords.state = 'PA';
      ords.city = 'Brewston';
      ords.zipCode = '18654';
      ords.createdDate = '2019-03-14 12:28:41';


      let ordsb = new _om();
      ordsb.orderId = 0222222;
      ordsb.po = 'testpo2';
      ordsb.shipTo = "Marketplace Shoes";
      ordsb.addressOne = '235 Highland Ave';
      ordsb.addressTwo = null;
      ordsb.state = 'MA';
      ordsb.city = 'Lewisburg';
      ordsb.zipCode = '17034';
      ordsb.createdDate  = '2019-02-20 12:28:41';

      re.push(ords);
      re.push(ordsb);

      res.json({ data: re });   
      } catch (e) {
        //todo
        next(e) 
      }



});




module.exports = router;