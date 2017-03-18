var fs = require('fs');
var http = require('http');
var exec = require('child_process').exec;
var jsonBody = require('body/json');
var IS_AN_IMAGE_REGEX = /\.jpg$/;

function postTweets(request, response) {
	var encoding = 'utf-8';

	fs.readFile(__dirname + '/tweets.json', encoding, function(error, fileContents) {
		if (error) { return; }

		var parsedFile = JSON.parse(fileContents);

		jsonBody(request, response, function(error, bodyPayload){
			parsedFile.data.push( { text: bodyPayload.text } );

			fs.writeFile(__dirname + '/tweets.json', JSON.stringify(parsedFile), function(error) {
				if (error) { return; }
			
				response.statusCode = 201;
				response.end("Created");
			});
		});
	});
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
const port = 8080;
const host = 'localhost';

server.listen(port, function() {
	console.log(`Server listening on: http://${host}:${port}`);

	exec(`open http://${host}:${port}`, function(error, stdout, stderr) {
		if (error) {
			console.log(`\nNow open http://${host}:${port} in your browser.`);
		}
	});
});