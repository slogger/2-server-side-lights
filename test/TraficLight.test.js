var expect = require('chai').expect;
var TraficLight = require('../TraficLight');

describe('first test', function() {
    var config = {
        timeout: {
            green: 100,
            yellow: 1000
        },
        order: ['Green', 'Yellow']
    };
    var trafic = new TraficLight(config);

    it('exist config', function() {
        expect(trafic.getConfig()).to.equal(config);
    });

    it('cycle time should be 1100', function() {
        expect(trafic.getCycleTime()).to.equal(1100);
    });
    trafic.run();

    it('color should be yellow', function(done) {
        setTimeout(function() {
            expect(trafic.state()).to.equal('Yellow');
            done();
        }, 100);
        expect(true);
    });

    it('last time should be less then 100', function() {
        expect(trafic.lastTime()).to.least(100);
    });
});
