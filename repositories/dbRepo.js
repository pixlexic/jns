var sql = require('mssql');

var dbRepo = {};




dbRepo.sqlConfig =  null;

dbRepo.init = function() {
	
	dbRepo.sqlConfig = {
			  user:  process.env.dbUser,
			  password: process.env.dbPass,
			  server: process.env.dbHost,
			  port:process.env.dbPort,
			  database:process.env.dbDatabase,
			  options: {
			    encrypt: true
			  }
			};

	
	

};








dbRepo.setUser = function(user,email,pass) {
	sql.close();
	sql.connect(dbRepo.sqlConfig, function (err) {
		 
	 if (err) console.log(err);

	 
	 var request = new sql.Request();
     console.log( user);
     console.log( pass);
     console.log( email);
	 // query to the database and get the records
	  request.input('IN_USERNAME',  sql.VarChar(100), user )
	  request.input('IN_PASSWORD',  sql.VarChar(100), pass )
	  request.input('IN_EMAIL',  sql.VarChar(100), email )
	  request.execute('setUser').then(function(err, recordsets, returnValue, affected) {
			sql.close();
	    //  console.dir(recordsets);
	      console.dir(err);
	    }).catch(function(err) {
	    	sql.close();
	      console.log(err);
	    });
	  });
	
}




















dbRepo.check  = function(user) {
    // Setting URL and headers for request

    // Return new promise 
    return new Promise(function(resolve, reject) {
    	// Do async job


    	
    	sql.close();

    	
    	sql.connect(dbRepo.sqlConfig, function (err) {
    		 
    	 if (err) console.log(err);

    	//	console.dir(user);
    	 var request = new sql.Request();

    	 // query to the database and get the records
    	  request.input('IN_USERNAME',  sql.VarChar(100), user )
    	  request.execute('checkUser').then(result => {
    		 //   console.dir(result.recordset[0].password)
    		  sql.close();
    		    resolve(result);
    		    
    		    
    	  }).catch(err => {
    	      // ... error checks
    		  reject (err);
    	  })
    	  });
    	
    	
    	
    	
    	
    	
    })

}









dbRepo.checkUser = function(user) {
	console.dir(user);

	
	sql.close();

	
	sql.connect(dbRepo.sqlConfig, function (err) {
		 
	 if (err) console.log(err);

	//	console.dir(user);
	 var request = new sql.Request();

	 // query to the database and get the records
	  request.input('IN_USERNAME',  sql.VarChar(100), user )
	  request.execute('checkUser').then(result => {
		 //   console.dir(result.recordset[0].password)
		    return result;
		    
	  }).catch(err => {
	      // ... error checks
	  })
	  });
	
}



dbRepo.red = function(data) {
	
	var r = JSON.parse(data);

	
	 console.log(r.recordset[0]);
}













dbRepo.getStatus = function() {
	
	
	
	
	
    // Return new promise 
    return new Promise(function(resolve, reject) {
    	// Do async job

    	sql.close();

    	sql.connect(dbRepo.sqlConfig, function (err) {
    		 
    	 if (err) console.log(err);

    	 var request = new sql.Request();

    	 // query to the database and get the records
    	  request.execute('getStatus').then(result => {
    		  sql.close();
    		    resolve( result);
    	  }).catch(err => {
    	      // ... error checks
    		  reject (err);
    	  })
    	  });
    	
    	
    	
    	
    	
    	
    })
	
	


}













dbRepo.getList = function() {
	
	
	
	
	
    // Return new promise 
    return new Promise(function(resolve, reject) {
    	// Do async job

    	sql.close();

    	sql.connect(dbRepo.sqlConfig, function (err) {
    		 
    	 if (err) console.log(err);

    	 var request = new sql.Request();

    	 // query to the database and get the records
    	  request.execute('getList').then(result => {
    		  sql.close();
    		    resolve( result);
    	  }).catch(err => {
    	      // ... error checks
    		  reject (err);
    	  })
    	  });
    	
    	
    	
    	
    	
    	
    })
	
	
	
	
	
	
	
	
	
	/*
	
	sql.close();
	//connect to your database
	sql.connect(dbRepo.sqlConfig, function (err) {
		   console.log('connrrr');
	 if (err) console.log(err);

	 // create Request object
	 var request = new sql.Request();

	 // query to the database and get the records
	  request.execute('getList').then(function(err, recordsets, returnValue, affected) {
			sql.close();
	     // console.dir(recordsets);
	      console.dir(err);
	    }).catch(function(err) {
	    	sql.close();
	      console.log(err);
	    });
	  });

*/
	
	
	}









module.exports = dbRepo;