var http = require('http');
var io = require("./io.js");

function startServer(port, source) {

	http.createServer(

		function (request, response) {

			let result = processRequest(request.url);

			response.writeHead(
				200,
				{
					'Content-Type':
					(Array.isArray(result) ?
						(result.length >= 2 ?
							result[1] :
							'text/plain') :
						'text/plain'),
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
				}
			);

			response.write("" + (Array.isArray(result) ? result[0] : result));

			response.end();
		}
	).listen(port);

	function processRequest(request) {

		try {

			return ((new Function(
				"module={exports:{}};" +
				io.open(source) +
				";return module.exports;"))())(request.substring(1));
		}

		catch(error) {
			return "SERVER ERROR: " + error.message;
		}
	}
}

module.exports = {
	startServer
};