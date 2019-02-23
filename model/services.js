var request = require('request');
var cheerio = require("cheerio");

class Employee{
    
    constructor() {
    }
    getEmployeeDetails(cb){
        var totalEmployees = [];
        var reply = {};
        request({
            uri: "https://www.pdq.com/about-us/",
        }, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var $ = cheerio.load(body);
                $(".imghvr-fade> img").each(function() {
                    var link = $(this);
                    var image = link.attr("src");
                    var username = link.attr("alt");
                    totalEmployees.push({"username":username, 'image':image});
                });
                reply['status'] = 1;
                reply['text'] = 'server successfully running';
                reply['data'] = totalEmployees
                cb(reply);
            }else{
                reply['status'] = 0;
                reply['text'] = 'The Website is Down';
                reply['data'] = 0
            }
            
        });
    }
    getEmployeeImage (cb){
        this.getEmployeeDetails(function(reply){
            var totalEmployees = reply.data;
            var responseJson = {};
            if(reply.status == 1 && totalEmployees != 0){
                request({
                    url: "https://pdqemployees.azurewebsites.net/api/pdqemployees",
                    json: true
                }, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                    //   console.log("UserName:"+body.name);
                    //   console.log("Drink:"+body.drink);
                        
                        Object.keys(totalEmployees).forEach(function(key) {
                            var item = totalEmployees[key];
                        if (body.name ==item.username){
                            request({
                                url: item.image,
                            }, function (error, response, bodyImage) {

                                if (error != "Invalid URI") {
                                    responseJson['status'] = 1;
                                    responseJson['text'] = 'Successful';
                                    responseJson['data'] = {"name":body.name, "drink": body.drink, 'image': item.image};
                                    cb(responseJson);
                                }else{
                                    responseJson['status'] = 1;
                                    responseJson['text'] = 'Employee image not found';
                                    responseJson['data'] = {"name":body.name, "drink": body.drink, 'image': "//cdn.pdq.com/wp-content/uploads/2017/10/default.png"};
                                    cb(responseJson);
                                }
                                
                            });
                            
                        }
                    
                    });
                    }else{
                        responseJson['status'] = 0;
                        responseJson['text'] = 'API is not working, status code: 500';
                        console.log("resposeCode:"+response.statusCode)
                        cb(responseJson);
                    }
                });
            }else{
                responseJson['text'] = reply.text;
                responseJson['status'] = 0;
                cb(responseJson);
            }
            

        });
        
        
    }
}
module.exports = Employee;