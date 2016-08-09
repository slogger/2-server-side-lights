// Каждую секунду обновляем данные о светофоре
setInterval(function() {
    ajax.get("/state", {}, function(data) {
        var res = JSON.parse(data);
        var state = document.getElementById('state');
        state.textContent = res.state;
    });
}, 1000);
