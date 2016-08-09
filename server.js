var TraficLight = require('./TraficLight.js');
var tramHandler = require('./TramHandler.js');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var config = {
    timeout: {
        green: 3000,
        yellow: 2000,
        red: 3000,
        tram: {
            arrival: 3000,
            passage: 15000
        }
    },
    order: ['Green', 'Yellow', 'Red']
};

var tramStatus = false;
var tramInterval = 50000;

// Создаем светофор
var trafic = new TraficLight(config);

// Добавляем обработчик трамвая
var options = {
    host: 'localhost',
    path: '/tramIsComing',
    port: PORT
};
tramHandler(trafic, options, eventEmitter);

// Запускаем светофор
trafic.run();

// Настраиваем сервер
app.use(express.static(__dirname + '/www')); // eslint-disable-line

app.get('/', function(req, res) {
    res.sendFile('www/index.html');
});

app.get('/state', function(req, res) {
    res.json({
        state: trafic.state(),
        lasttime: trafic.lastTime()
    });
});

app.get('/tramIsComing', function(req, res) {
    res.send(tramStatus);
});

// Запускаем сервер
var server = app.listen(PORT, function() {
    console.log('Listening on port %d', server.address().port);
});

// Каждые 'tramInterval' мсек запускаем трамвай
setInterval(function() {
    tramStatus = true;
}, tramInterval);

eventEmitter.on('restore', function() {
    tramStatus = !tramStatus;
});
