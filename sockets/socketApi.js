 var socket_io = require('socket.io');

 var passport = require("passport");
 
 
 
var config = require('../sockets/owlConfig');
var dB = require('../repositories/dbRepo');
var tasks  = require('../services/tasks');


var owlBaseModel = require('../models/owlBaseModel');
var userSocketModel = require('../models/userSocketModel');


var io = socket_io();
var socketApi = {};

socketApi.io = io;

var owlBase = new owlBaseModel();


socketApi.init = function() {
	
	socketApi.sendListData();
	
	
}





io.on('connection', function(socket){
    console.log('A user connected');
   
 
 	if(socket.handshake.session.passport){
    //	console.log(socket.handshake.session);	
    	
 		socket.user = socket.handshake.session.passport;
 		
 		if(socketApi.getUserConnectionCount(socket.user) > 2){
 			
 			socket.emit('refused', {data:  null});
    		//socket.conn.close ();
    		socket.disconnect()
 		}
 		
 		//console.log(socket.user.socketCount);
 		
 		//socket.handshake.session.passport
 		
   
    	} else {
    		//return false;
    		
    		socket.emit('refused', {data:  null});
    		//socket.conn.close ();
    		socket.disconnect()
    	
    	}

 	

 socket.on('ready', function(data) {	
 		
	 console.log('ready');
	// console.dir(socket.user.user.isAdmin);
	 
	 
	 if(data == 'admin' && socket.user.user.isAdmin == 1) {
		 console.log('joined admin');
		 config.adminInit(socket,socketApi);
		 	
		  socket.join('oAdmin');
	
	 }
	 
	 
	 
	 if(data == 'owllist' ) {
		
		
		  socket.join('owllist');
		 // socket.emit('conn', {data:  'connected'});
		socket.emit('list', {data:  owlBase});
	 }
	 
	 
 		
 	});
 	
 

 
 socket.on('getowll', function(data) {	
	 
	 socket.emit('list', {data:  owlBase});
	 
 });
 
  
  
    socket.on('disconnect', function() {
    	
    	
    	socket.conn.close ();
		socket.disconnect();
    	
    	
    	 console.log( ' user disconnect');
    	/*
    	for(var i = 0; i< clients.length; i++){
    		if(clients[i]){
    		if(clients[i].id == socket.id){
        delete  clients [i];
           clients.splice(i, 1);
        break;
    		}
    		}
    	}
        
        var u = [];
        for(var i = 0; i< clients.length; i++){
        	    u.push(clients[i]);    
        }
        */
        //io.sockets.emit('users', {users: u });
        
    });




});











socketApi.sendList = function() {
	   console.log('fff');
	 //  console.dir( io.sockets.adapter.rooms);
	//   console.dir( io.sockets.adapter.rooms.length);
	   
	   
	  // console.dir( io.sockets.adapter.rooms['general']);

	//   var clients = io.sockets.adapter.rooms['Room Name'].sockets; 
	   
	   if(io.sockets.adapter.rooms['general']){
	   var clients = io.sockets.adapter.rooms['general'].sockets;   

	 //to get the number of clients
	 var numClients = (typeof clients !== 'undefined') ? Object.keys(clients).length : 0;

	 for (var clientId in clients ) {

	      //this is the socket of each client in the room.
	      var clientSocket = io.sockets.connected[clientId];

	      //you can do whatever you need with this
	     // clientSocket.emit('new event', "Updates");
	    //  console.dir(clientSocket.user);//  .handshake.session.passport);
	 }
	   
	   
	   }
	    		
	   
	  
	   
	   
	   for (var gg in io.sockets.connected ) {   
		 //  console.dir(gg)
		 //  console.dir(io.sockets.connected[gg].user);
		   
	   }
	   
	   
	   
	    	
	    	
	    	/*
	    	  for(var ii = 0; ii< io.sockets.adapter.rooms[i].sockets.length; ii++){
	    		  
	    		  console.log(io.sockets.adapter.rooms[i].sockets[ii]);
	    		  
	    	  }
	   
	    	  */
	   
	   
	    
	
	  
	    
	    
	  /*
	    var u = [];
	    for(var i = 0; i< clients.length; i++){

if(clients.socket == null){
	
    delete  clients [i];
    clients.splice(i, 1);
	
}
	    	
	    	//console.log(clients);
	    	
	    }
	   
	   */
	//   console.log(clients.length);
	   
   //	var ret =  dB.getList().then(result => {
   		
   		//owlBase = new owlBaseModel();
   		//owlBase.list =  result.recordset;
		    
 // socketApi.sendListData();
   		
		  //	io.sockets.emit('list', {data:  owlBase});
  // 	});
 	


} 






socketApi.sendListData = function() {

	//io.sockets.emit('servdata', {data:  data});

   console.log('listdata');
   
   
   	var ret =  dB.getStatus().then(result => {
		
		owlBase = new owlBaseModel();
		owlBase.status =  result.recordset;
	    
         socketApi.sendListDataOrders();
		
	  	//io.sockets.emit('list', {data:  owlBase});
	});
   
   //io.sockets.emit('list', {data:  owlBase});

};

 
socketApi.sendListDataOrders = function() {
	
 	var ret =  dB.getList().then(result => {
		
		//owlBase = new owlBaseModel();
		owlBase.list =  result.recordset;
	    
         //socketApi.sendListData();
		socketApi.sendListDataFinal();
	
	});
   
   //io.sockets.emit('list', {data:  owlBase});

};
	








socketApi.sendListDataFinal = function() {
	
	
  	io.sockets.emit('list', {data:  owlBase});
	
};











socketApi.getUserConnectionCount= function(currentUser) {

	
	//console.log(currentUser)
let c = 0;
		for (let gg in io.sockets.connected) {

			if (io.sockets.connected[gg].user.user.id == currentUser.user.id) {

				
	
             c++;


			}


		}

		
		console.log(c)
		
		return c;
		
	}

	socketApi.getUserList = function() {
	
	
	/*
	   if(io.sockets.adapter.rooms['general']){
		   var clients = io.sockets.adapter.rooms['general'].sockets;   

		 //to get the number of clients
		 var numClients = (typeof clients !== 'undefined') ? Object.keys(clients).length : 0;

		 for (var clientId in clients ) {

		      //this is the socket of each client in the room.
		      var clientSocket = io.sockets.connected[clientId];

		      //you can do whatever you need with this
		     // clientSocket.emit('new event', "Updates");
		      console.dir(clientSocket.user);//  .handshake.session.passport);
		 }
		   
		   
		   }
		*/    		
		   
	       let usr = [];
		   let arr = [];
		   
		   
		   
		   for (let gg in io.sockets.connected ) {  
			   
		        if ( !usr.some( x => x.id == io.sockets.connected[gg].user.user.id) ) {
			   usr.push(io.sockets.connected[gg].user.user);
		        }
		   }
		   
		   
		   for (let i = 0; i < usr.length; i++ ) {  
			   
			
			   
			   let u = new userSocketModel();
			       u.user = usr[i];
			   
		   for (let gg in io.sockets.connected ) {  
			   
			   if(io.sockets.connected[gg].user.user.id == usr[i].id ){
				   
				   let ob = new Object();
				   ob.id = gg;
				   ob.rooms = [];
				   for (var property in io.sockets.connected[gg].rooms) {
					    if (io.sockets.connected[gg].rooms.hasOwnProperty(property)) {
					    	ob.rooms.push(property);
					    }
					    
					}
				   
				   
				   
				   
				   u.sockets.push(ob);
			   }
		
			   
			   
			  // console.dir(io.sockets.connected[gg].rooms)
			//   console.dir(io.sockets.connected[gg].user);
		
			   
		
		   }
		   
		   
			arr.push(u);
		   
		   }
		   
			return arr; 
};




socketApi.buildServerData = function() {
	
	let ob = new Object();
	
	 ob.users = socketApi.getUserList ();
	 ob.tasks  = tasks.exportList();
	 
	 return ob;
	
};




socketApi.sendServerData = function() {

		//io.sockets.emit('servdata', {data:  data});
	

	
	   console.log('serverdata');
	   io.sockets.in('oAdmin').emit( 'serverdata', {data: socketApi.buildServerData() });

} ;






socketApi.sendNotification = function() {
    io.sockets.emit('news', {msg: 'Hello Corld!'});
}

module.exports = socketApi;