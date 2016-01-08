require('dotenv').load();
var connectDB = require('../').connectDB,
    disconnectDB = require('../').disconnectDB,
    mongoose = require('mongoose'),
    dbURI = process.env.MONGO_URI + "test",
    clearDB = require('mocha-mongoose')(dbURI),
    expect = require('expect.js'),
    path = process.cwd(),
    ImageSearchController = require(path + '/app/controllers/imageSearchController.js');

describe('imageSearchController', function() {
    var imageSearchCtrl;

    before(function(done) {
        imageSearchCtrl = new ImageSearchController();
        if (mongoose.connection.db) return done();
          mongoose.connect(dbURI, done);
    });
    beforeEach(function(done) {
        mongoose.modelSchemas = {};
        mongoose.models = {};
        clearDB(done);
    });


    describe('#search', function() {
        it('should return array when searching', function(done) {


            var query = "lolcat";
            var offset = "1";
            imageSearchCtrl.search(query, offset, function(results) {

                expect(results).to.be.an('array');
                done();
            });
        })
        
        it('should return more than one result on a valid query', function(done) {


            var query = "lolcat";
            var offset = "1";
            imageSearchCtrl.search(query, offset, function(results) {

                expect(results.length).to.be.greaterThan(0);
                done();
            });
        })

    });

    describe('#getRecentSearches', function() {

        it('should return array', function(done) {
            imageSearchCtrl.getRecentSearches(function(results) {
                expect(results).to.be.an('array');
                done();
            });
        })

        it('should return empty array when no searches entered', function(done) {
            imageSearchCtrl.getRecentSearches(function(results) {
                expect(results.length).to.be.equal(0);
                done();
            });
        })

        it('should return array of length 1 when 1 search entered', function(done) {
            var query = "new search";
            var offset = "1";
            imageSearchCtrl.search(query, offset, function(results) {
                imageSearchCtrl.getRecentSearches(function(results) {
                    expect(results.length).to.be.equal(1);
                    done();
                });
            });
        })

    });

    after(function(done) {
        done();
        // mongoose.disconnect(done);
        // mongoose.modelSchemas = {};
        // mongoose.models = {};
        // if (!mongoose.connection.db) return done();
        // mongoose.disconnect(done);
        // mongoose.connection.on('disconnected', function() {
        //     console.log("done disconnecting");
        //     done();
        // });
    });
});