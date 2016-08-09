var request = require("request");

/**
 * Обработчик события трамвай
 *
 * @param {TraficLight} trafic - экземпляр светофора
 * @param {Object} options - урл с которого слушаем событие
 * @param {EventEmitter} eventEmitter - eventEmitter
 */
var TramHandler = function(trafic, options, eventEmitter) {
    var sendRequest = function() {
        var url = [
            'http://',
            options.host,
            options.port ? ':' + options.port : '',
            options.path
        ].join('');
        var ctx = this;
        request(url, function(error, response, body) {
            if (error) {
                throw (error);
            } else if (body === 'true') {
                eventEmitter.emit('tram', ctx);
            }
        });
    };

    /**
     * Проверка едет ли трамвай
     *
     * @this {TramHandler}
     */
    this.tramChecker = function() {
        this._checkerId = setInterval(function() {
            sendRequest();
        }, 1000);
    };

    (this.tramChecker());

    /**
     * Обработчик события 'tram'
     *
     * 1) Запоминаем цвет который горит сейчас
     * 2) Высчитываем дельту времени
     * 3) Через timeout.tram.arrival мсек переключаемся в зеленый на timeout.tram.passage мсек
     * 4) После того как трамвай проехал, говорим что можно востановится
     *
     * @param {TramHandler} ctx
     */
    eventEmitter.on('tram', function(ctx) {
        if (ctx._checkerId) {
            clearInterval(ctx._checkerId);
        }
        var currentTime = new Date();
        var previousColor = trafic.state();
        var restTime = trafic.current.timeout -
            (currentTime - trafic.current.startTime);
        var tramTime = trafic.getConfig().timeout.tram;

        setTimeout(function() {
            trafic.switch('Green', tramTime.passage);
        }, tramTime.arrival);

        eventEmitter.emit('restore', previousColor, restTime, ctx);
    });

    /**
     * Обработчик события 'restore'
     *
     * Если гореть остается меньше percent % от изначального времени, переключаемся на следующий цвет
     *
     * @param {string} color цвет в котором мы были до трамвая
     * @param {number} restTime остаток времени
     * @param {TramHandler} ctx
     * @param {number} percent
     */
    eventEmitter.on('restore', function(color, restTime, ctx, percent) {
        var tramTime = trafic.getConfig().timeout.tram;
        var tramTimeAll = tramTime.arrival + tramTime.passage;

        setTimeout(function() {
            var traficConfig = trafic.getConfig();
            var timeout = traficConfig.timeout[color.toLowerCase()];
            var controlTime = ((timeout / 100) * (percent || 25));

            if (restTime > controlTime) {
                trafic.switch(color, restTime);
            } else {
                trafic.current.color = color;
                trafic.next();
            }

            ctx.tramChecker();
        }, tramTimeAll);
    });
};

module.exports = TramHandler;
