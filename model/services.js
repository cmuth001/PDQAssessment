var request = require('request');
var cheerio = require("cheerio");

class Employee{
    
    constructor() {
    }
    getEmployeeDetails(cb){
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
            console.log("test");
            cb(totalEmployees);
        });
       
        // console.log(totalEmployees);
        // console.log("test");
        // return totalEmployees;
    }
    getEmployeeImage (cb){
        this.getEmployeeDetails(function(totalEmployees){
            request({
                url: "https://pdqemployees.azurewebsites.net/api/pdqemployees",
                json: true
            }, function (error, response, body) {
                console.log("totalEmployees: "+(typeof totalEmployees));
                if (!error && response.statusCode === 200) {
                  console.log("UserName:"+body.name);
                  console.log("Drink:"+body.drink);
                    
                    Object.keys(totalEmployees).forEach(function(key) {
                        var item = totalEmployees[key];
                    if (body.name ==item.username){
                        request({
                            url: item.image,
                        }, function (error, response, bodyImage) {
                            if (error != "Invalid URI") {
                                var data = {"name":body.name, "drink": body.drink, 'image': item.image};
                                // console.log("data: "+data);
                                cb(data);
                            }else{
                                var data = {"name":body.name, "drink": body.drink, 'image': "//cdn.pdq.com/wp-content/uploads/2017/10/default.png"};
                                // console.log("data: "+data);
                                cb(data);
                                
                            }
                            
                        });
                        
                    }
                
                });
                }else{
                    console.log("resposeCode:"+response.statusCode)
                }
            });

        });
        
        
    }
}
module.exports = Employee;