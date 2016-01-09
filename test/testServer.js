    var boot = require('../').boot,
      shutdown = require('../').shutdown,
      port = require('../').port,
      superagent = require('superagent'),
      expect = require('expect.js');
    describe('server', function() {
      before(function(done) {
        boot();
        done();
      });
      describe('homepage', function() {
        it('should respond to GET', function(done) {
          superagent
            .get('http://localhost:' + port)
            .end(function(err, res) {
              expect(res.statusCode).to.equal(200);
              // Calling the end function will send the request 
              done();
            });
        })
      });

      after(function(done) {
        shutdown();
        done();
      });
    });