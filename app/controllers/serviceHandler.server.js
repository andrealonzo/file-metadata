'use strict';
var ImageSearchController = require("../controllers/imageSearchController.js");
function ServiceHandler () {
	var imageSearchController = new ImageSearchController();
	this.imageSearch = function (req, res) {
		var query = req.params.id;
		var offset = 0;
		if(req.query && req.query.offset){
			offset = req.query.offset;
		}
		imageSearchController.search(query, offset,  function(results){
				res.json(results);
		});
	};
	
	this.recentSearches = function (req, res) {
		imageSearchController.getRecentSearches(function(results){
			res.json(results);
		});
	};

}

module.exports = ServiceHandler;
