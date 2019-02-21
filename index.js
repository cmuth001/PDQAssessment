var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var request = require("request");
var cheerio = require("cheerio");
var totalEmployees = [];
request({
  uri: "https://www.pdq.com/about-us/",
}, function(error, response, body) {
  var $ = cheerio.load(body);
  $(".imghvr-fade> img").each(function() {
    var link = $(this);
    var image = link.attr("src");
    var username = link.attr("alt");
    totalEmployees.push({"username":username, 'image':image});
  });
});


io.on('connection', function(socket){
  socket.on('getEmployee', function(){
    request({
        url: "https://pdqemployees.azurewebsites.net/api/pdqemployees",
        json: true
    }, function (error, response, body) {
    
        if (!error && response.statusCode === 200) {
          console.log("UserName:"+body.name);
          console.log("Drink:"+body.drink);
        totalEmployees.forEach(function(item) {
            if (body.name ==item.username){
                request({
                    url: item.image,
                }, function (error, response, bodyImage) {
                    if (error != "Invalid URI") {
                        io.emit('getEmployee', {"name":body.name, "drink": body.drink, 'image': item.image});
                    }else{
                        io.emit('getEmployee', {"name":body.name, "drink": body.drink, 'image': "//cdn.pdq.com/wp-content/uploads/2017/10/default.png"});
                    }
                    
                });
                
            }
        
        });
        

        }else{
            console.log("resposeCode:"+response.statusCode)
        }
    });
    
  });
});
http.listen(3000, function(){
    console.log('listening on *:3000');
  });

