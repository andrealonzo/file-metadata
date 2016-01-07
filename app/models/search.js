'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Search = Schema({
        value:String
    });
    
module.exports = mongoose.model('Search',Search);