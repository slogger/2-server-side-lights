// Каждую секунду обновляем данные о светофоре
var intervalId = setInterval(function() {
    ajax.get("http://localhost:3000/state", {}, function(data) {
        var res = JSON.parse(data);
        var state = document.getElementById('state');
        state.textContent = res.state;
    });
}, 1000);
