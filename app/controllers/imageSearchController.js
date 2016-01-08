'use strict';

var SearchSchema = require('../models/search.js');
var Bing = require('node-bing-api');

function ImageSearchController() {
    this.search = function(query, offset, done) {
        saveSearch(query, function(err) {
            if (err) return done([]);
            var bing = new Bing({
                accKey: process.env.BING_ACCT_KEY
            });
            bing.images(query, {
                top: 10,
                skip: offset*10
            }, function(error, res, body) {
                if (error) {
                    return done([]);
                }
                return done(parseResults(body.d.results));
            });
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
        }).sort({
            when: -1
        });
    }
    var saveSearch = function(query, done) {
        var search = new SearchSchema();
        search.term = query;

        search.save(function(err) {
            if (err) return done(err);
            return done();
        })
    };
    
    var parseResults = function(results){
        var newResults = [];
        for(var i=0; i < results.length; i++){
            var newResult={};
            newResult.url = results[i].MediaUrl;
            newResult.context = results[i].SourceUrl;
            newResult.snippet = results[i].Title;
            if(results[i].Thumbnail){
                newResult.thumbnail = results[i].Thumbnail.MediaUrl;
            }
            newResults.push(newResult);
        }
        return newResults;
    };


}

module.exports = ImageSearchController