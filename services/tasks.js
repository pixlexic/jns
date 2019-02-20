var cron = require('node-cron');


var tasks = {};

tasks.list = [
	{id:'Admin', timing:'*/5 * * * * *', task: null},
	{id:'List', timing:'* * * * *', task: null}
	
	];
	



tasks.exportList = function() {


	let a = [];
	
	for (let i = 0; i < tasks.list.length; i++) {
		
		let o = new Object();
		o.id = tasks.list[i].id;
		o.timing = tasks.list[i].timing;
		o.isrunning = tasks.isRunning(tasks.list[i].task);
		
		a.push(o);
	}
	
	return a;
	
};



tasks.isRunning = function(task) {
	
	//console.log(task);
	if(task.tick != null){
		return true;
	}
	
		return false;

	
};




tasks.setupTasks = function(socketApi) {
	
	
	
	//for (let i = 0; i < tasks.list.length; i++) {
		
		var tas = cron.schedule(tasks.list[1].timing, function(){
			  socketApi.sendListData();
			});
		
		tasks.list[1].task = tas;
		//tasks.stop(tas);
	//	tasks.list.push(tas);
		
	//}
	

		var tas2 = cron.schedule(tasks.list[0].timing, function(){
			  socketApi.sendServerData();
			});
		
		tasks.list[0].task = tas2;

	//socketApi.sendList(); 

}






tasks.action = function(data){
	
	console.log(data);
	
	for (let i = 0; i < tasks.list.length; i++ ) {
		
		
		console.log(data.id );
		
		if( data.id === tasks.list[i].id ) {
			
			if (data.action == 'start') {
				tasks.start(tasks.list[i].task);
			} else {
				console.log('stop');
				tasks.stop(tasks.list[i].task);
			}
			break;
		}
		
		
	}
	

	
	
}




tasks.start = function(t){
	
	console.log('start task');
	
	t.start();
	
}



tasks.stop = function(t){
	
	console.log('stop task');
	t.stop();
	
	
}





module.exports = tasks;