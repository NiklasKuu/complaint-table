$("#Check-button").click(function () {
    var tank = $('input[name=tank]');
    var map = $('input[name=map]');
    var reason = $('input[name=reason]');

    if (tank.val() !== "" && map.val() !== "" && reason.val() !== "") {
        var data = "tank="+tank.val()+"&map="+map.val()+"&reason="+reason.val();
        tank.val("");
        map.val("");
        reason.val("");
        $.ajax({
            url: '/api/rages/new',
            data: data,
            processData: false,
            type: 'POST',
            success: function (data) {
                var content = "<tr><td>"+data.dateTime+"</td><td>"+data.tank+"</td><td>"+data.map+"</td><td>"+data.reason+"</td><td><button value="+data._id+" class=\"glyphicon glyphicon-remove remove-button\"></button></td></tr>";
                var rageBody = $("#rageBody");
                var addRage = $("#add-rage");
                
                addRage.before(content);
                //rageBody.append(content);
                //rageBody.append(addRage);
            }
        });
    } else {
        alert("something went wrong");
    }
});

$("tbody").on('click', '.remove-button', function() {
    var caller = $(this);
    $.ajax({
        url: '/api/rages/' + caller.attr("value"),
        type: 'DELETE',
        success: function (){
            caller.parent().parent().remove();
        }
    });
});
