    var boot = require('../').boot,
      shutdown = require('../').shutdown,
      connectDB = require('../').connectDB,
      disconnectDB = require('../').disconnectDB,
      port = require('../').port,
      superagent = require('superagent'),
      expect = require('expect.js');
    describe('imageSearch.server', function() {
      before(function() {
        boot();
        connectDB("testCollection");
      });
      describe('imageSearch', function() {
        it('should respond to GET', function(done) {
          superagent
            .get('http://localhost:' + port + '/imagesearch/lolcats%20funny?offset=10')
            .end(function(err, res) {
              expect(res.statusCode).to.equal(200);
              // Calling the end function will send the request 
              done();
            });
        })
      });
      describe('recentImageSearch', function() {
        it('should respond to GET', function(done) {
          superagent
            .get('http://localhost:' + port + '/latest/imagesearch/')
            .end(function(err, res) {
              expect(res.statusCode).to.equal(200);
              // Calling the end function will send the request 
              done();
            });
        })
      });

      // describe('database', function() {
      //   it('should be connecting', function(done) {
      //     expect(mongoose.connection.readyState).to.equal(mongoose.Connection.STATES.connected);
      //     done();
      //   })
      // });
      after(function() {
        disconnectDB();
        shutdown();
      });
    });