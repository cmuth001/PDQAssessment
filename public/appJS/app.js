
$(document).ready(function(){
    var socket = io();
    $(document).on('click', '#send', function(e){
        e.preventDefault(); // prevents page reloading
        socket.emit('getEmployee');
        return false;
    });
    socket.on('getEmployee', function(msg){  
      $('#userName').html(msg.name);
      $('#drinkName').html(msg.drink);
      $("#image").attr("src", msg.image);
    });
});