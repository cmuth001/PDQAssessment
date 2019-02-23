var Employee = require('../model/services.js');
class Controller{
    getEmployeeImage(cb){
        var empObj = new Employee();
        empObj.getEmployeeImage(function(response){
            cb(response);
        });
    }
}
module.exports = Controller;