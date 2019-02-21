var mysql = require('mysql');

var dbMySQLRepo = {};



dbMySQLRepo.con = null;


dbMySQLRepo.init = function() {
/*	
    dbMySQLRepo.con = mysql.createConnection({
        host: process.env.dbHost,
        user: process.env.dbUser,
        password: process.env.dbPass
      });

*/	
	

};


dbMySQLRepo.conn = function() {

return   mysql.createConnection({
        host: process.env.dbHost,
        user: process.env.dbUser,
        password: process.env.dbPass
      });



}






dbMySQLRepo.connectTest = function() {
	
 
   let con = dbMySQLRepo.conn();
    
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
    
     con.end();
/*
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Result: " + result);
        });
      });

*/

   
};












dbMySQLRepo.getOrders = function(user) {
    // Setting URL and headers for request

    // Return new promise 
    return new Promise(function(resolve, reject) {
    	// Do async job

        let q = " SELECT * FROM jnsserver.orders;";

        let con = dbMySQLRepo.conn();
         con.connect(function(err) {
                if (err) throw err;
               // console.log("Connected!");
           con.query(q, function (err, result) {
                  if (err) {
                    con.end();
                    reject (err);
                  }
                  //console.log("Result: " + result);
                  con.end();
           
                  resolve(result);
                });
              });
    	
    	
    	
    	
    })

}












module.exports = dbMySQLRepo;