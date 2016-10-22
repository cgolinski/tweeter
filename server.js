var fs = require('fs');
var http = require('http');
var IS_AN_IMAGE_REGEX = /\.jpg$/;

function postTweets(request, response) {
	response.end('blah');
}

function defaultRoute(request, response) {
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

function handleRequest(request, response) {
	const route = request.method + ' ' + request.url;
	
	switch(route) {
		case 'POST /tweets':
			return postTweets(request, response);
		default:
			return defaultRoute(request, response);
	}
}


const server = http.createServer(handleRequest);

server.listen(8080, function() {
	console.log('Server listening on: http://localhost:8080');
});