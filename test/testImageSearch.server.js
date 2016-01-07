  require('dotenv').load();
  var boot = require('../').boot,
    shutdown = require('../').shutdown,
    port = require('../').port,

    mongoose = require('mongoose'),
    dbURI = process.env.MONGO_URI + "test",
    clearDB = require('mocha-mongoose')(dbURI),
    superagent = require('superagent'),
    expect = require('expect.js');
  describe('imageSearch.server', function() {
    before(function(done) {
      boot();
      if (mongoose.connection.db) return done();
      mongoose.connect(dbURI, done);
    });

    beforeEach(function(done) {
      mongoose.modelSchemas = {};
      mongoose.models = {};
      clearDB(done);
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


    describe('recentImageSearch', function() {
      it('should be an empty JSON array', function(done) {
        superagent
          .get('http://localhost:' + port + '/latest/imagesearch/')
          .end(function(err, res) {
            expect(res.body).to.eql({});
            // Calling the end function will send the request 
            done();
          });
      })

      it('should have 1 result when a search is made', function(done) {
        var query = "lolcats funny"
        superagent
          .get('http://localhost:' + port + '/imagesearch/' + query + '?offset=10')
          .end(function(err, res) {
            superagent
              .get('http://localhost:' + port + '/latest/imagesearch/')
              .end(function(err, res) {
                expect(res.body.length).to.eql(1);
                expect(res.body[0].term).to.equal(query);
                expect(res.body[0].when).to.be.a("string");
                done();
              });

          });

      })


      it('should have only display type and when', function(done) {
        var query = "lolcats funny"
        superagent
          .get('http://localhost:' + port + '/imagesearch/' + query + '?offset=10')
          .end(function(err, res) {
            superagent
              .get('http://localhost:' + port + '/latest/imagesearch/')
              .end(function(err, res) {
                expect(Object.keys(res.body[0]).length).to.equal(2);
                expect(Object.keys(res.body[0]).indexOf("term")).not.equal(-1);
                expect(Object.keys(res.body[0]).indexOf("when")).not.equal(-1);
                done();
              });

          });

      })
    });

    after(function() {
      shutdown();
      //  disconnectDB(done);
    });
  });