var Employee = require('./model/services.js');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use('/public', express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});



io.on('connection', function(socket){
  socket.on('getEmployee', function(){
    var empObj = new Employee();
    empObj.getEmployeeImage(function(data){
      io.emit('getEmployee', data);
    });
    
  });
});
http.listen(3000, function(){
    console.log('listening on *:3000');
  });

