'use strict';

var SearchSchema = require('../models/search.js');

function ShortenerController() {
    this.search = function(query, done) {
        saveSearch(query, function(err) {
            if (err) return done(err);
            done([]);
        });
    }
    this.getRecentSearches = function(done) {
        SearchSchema.find({}, function(err, searches) {
            if(err) return done([]);
            done(searches);
        });
    }
    var saveSearch = function(query, done) {

        var search = new SearchSchema();
        search.value = query;
        search.save(function(err) {
            if (err) return done(err);
            return done();
        })
    };


}

module.exports = ShortenerController