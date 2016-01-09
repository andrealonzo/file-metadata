'use strict';

function ServiceHandler() {
	this.analyzeFile = function(req, res) {
		if(!req.file){
			return res.json({});
		}
		res.json({
			fileSize: req.file.size,
			encoding: req.file.encoding,
			mimetype: req.file.mimetype,
			filename: req.file.originalname
		});
	};



}

module.exports = ServiceHandler;
