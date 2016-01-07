'use strict';

var SearchSchema = require('../models/search.js');

function ImageSearchController() {
    this.search = function(query, done) {
        saveSearch(query, function(err) {
            if (err) return done(err);
            return done([]);
        });
    }
    this.getRecentSearches = function(done) {
        SearchSchema.find({}, {
            _id: false,
            term: true,
            when: true
        }, function(err, searches) {
            if (err) return done([]);
            return done(searches);
        }).sort({when:-1});
    }
    var saveSearch = function(query, done) {
        var search = new SearchSchema();
        search.term = query;

        search.save(function(err) {
            if (err) return done(err);
            return done();
        })
    };


}

module.exports = ImageSearchController