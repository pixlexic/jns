var socket_io = require('socket.io');
var tasks = require('../services/tasks');




var owlConfig = {};






owlConfig.init = function(socket, data) {


    socket.on('getlist', function() {
        //console.log(data);
        socket.emit('list', { data: data });

    });




}




owlConfig.adminInit = function(socket, SocketApi) {

    socket.on('gettasks', function() {
        console.log('tasks');
        socket.emit('serverdata', { data: SocketApi.buildServerData() });
        //io.sockets.in('oAdmin').emit( 'serverdata', {data: tasks.list});
    });


    socket.on('tasksrun', function(data) {
        console.log('sstasks');


        tasks.action(data);


        socket.emit('serverdata', { data: SocketApi.buildServerData() });
        //io.sockets.in('oAdmin').emit( 'serverdata', {data: tasks.list});
    });

}








module.exports = owlConfig;