	var app = require('express')();
	var urlPath = '';
	var numUrlPath = 0;
	var isNan = true;
	
	function returnPath(val){
		var arr = val.split('');
		arr.splice(0,1);
		return arr.join('');
	}
	function humanReadableDate(urlPath) {
		var dateObj = {};
		var month = {
			0: 'January',
			1: 'February',
			2: 'March',
			3: 'April',
			4: 'May',
			5: 'June',
			6: 'July',
			7: 'August',
			8: 'September',
			9: 'October',
			10: 'November',
			11: 'December'
		};
		if (isNan) {
		dateObj = new Date(urlPath);
		} else {
		dateObj = new Date(numUrlPath * 1000);
		}
		return month[dateObj.getMonth()] + " " + dateObj.getDate() + ',' + dateObj.getFullYear();
	}
	
	function jsonResult(urlPath){
		var humanReadableDateString = humanReadableDate(urlPath);
		if (isNan) {
		var json = {
			'unix': Date.parse(urlPath) / 1000,
			'natural': humanReadableDateString
		};
		return json;
		} else {
			return {
						'unix': urlPath,
			'natural': humanReadableDateString
			};
		}
	}
	
	app.get('/*', function(req, res) {
		urlPath = decodeURIComponent(returnPath(req.originalUrl));
		numUrlPath = Number(urlPath);
		isNan = isNaN(numUrlPath);
		if (req.originalUrl.length == 1) {
			res.sendFile(process.cwd() + '/public/index2.html');
		} else {
				if (new Date(urlPath) != 'Invalid Date' || new Date(Number(urlPath)) != 'Invalid Date') {
			if (isNan) {
					    res.json(jsonResult(urlPath));
			} else {
				res.json(jsonResult(urlPath));
			}
		} else {
			var nul = {
			'unix': null,
			'natural': null
		};
			res.json(nul);
		}
		}
	});
	var port = process.env.PORT || 8080;
	app.listen(port,  function () {
		console.log('Node.js listening on port ' + port + '...');
	});