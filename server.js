var fs = require('fs');
var http = require('http');
var IS_AN_IMAGE_REGEX = /\.jpg$/;


function handleRequest(request, response) {
	var filePath = request.url;
	var encoding = 'utf-8';

	if (filePath === '/') {
		filePath = '/index.html';
	}

	if (IS_AN_IMAGE_REGEX.test(filePath)) {
		encoding = undefined;
	}

	fs.readFile(__dirname + filePath, encoding, function (error, fileContents) {
		 response.end(fileContents);
	});
}


const server = http.createServer(handleRequest);

server.listen(8080, function() {
	console.log('Server listening on: http://localhost:8080');
});