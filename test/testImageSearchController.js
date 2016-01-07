var connectDB = require('../').connectDB,
    disconnectDB = require('../').disconnectDB,
    mongoose = require('mongoose'),
    dbURI = "mongodb://localhost:27017/test",
    clearDB  = require('mocha-mongoose')(dbURI),
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
        mongoose.modelSchemas={};
        mongoose.models={};
        clearDB(done);
    });
    // describe('#getRecentSearches', function() {

    //     it('should return null when null URL is added', function(done) {

    //         var url = null;
    //         imageSearchCtrl.shortenUrl(url, function(shortenedUrl) {

    //             expect(shortenedUrl).to.be(null);
    //             done();
    //         });
    //     })

    // });


    describe('#search', function() {

        it('should return array when searching', function(done) {
            var query = "lolcat";
            imageSearchCtrl.search(query, function(results) {
                expect(results).to.be.an('array');
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
            imageSearchCtrl.search(query, function(results) {
                imageSearchCtrl.getRecentSearches(function(results) {
                    expect(results.length).to.be.equal(1);
                    done();
                });
            });
        })

    });

    after(function(done) {
        done();
        // mongoose.modelSchemas = {};
        // mongoose.models = {};
        // disconnectDB();
        // mongoose.connection.on('disconnected', function() {
        //     console.log("done disconnecting");
        //     done();
        // });
    });
});