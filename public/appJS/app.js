
$(document).ready(function(){
    var socket = io();
    $(document).on('click', '#send', function(e){
        e.preventDefault(); // prevents page reloading
        socket.emit('getEmployee');
        return false;
    });
    socket.on('getEmployee', function(response){
      var msg = response.data;
      if(response.status == 1 && response.text =='Successful'){
        $('#employeeDetails').show();
        $('#userName').html(msg.name);
        $('#drinkName').html(msg.drink);
        $("#image").attr("src", msg.image);
        $('#errorMsg').hide();
      }else if(response.status == 1 && response.text =='Employee image not found'){
        $('#employeeDetails').show();
        $('#userName').html(msg.name);
        $('#drinkName').html(msg.drink);
        $("#image").attr("src", msg.image);
        $('#errorMsg').html(response.text)
        $('#errorMsg').show();
      }else{
        $('#employeeDetails').hide();;
        $('#errorMsg').html(response.text)
        $('#errorMsg').show();
      }
      
    });
});