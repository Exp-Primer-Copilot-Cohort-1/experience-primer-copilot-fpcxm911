// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var comments = [];
var server = http.createServer(function(req, res) {
    var parseUrl = url.parse(req.url);
    var pathname = parseUrl.pathname;
    if (pathname === '/') {
        fs.readFile('./index.html', function(err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    } else if (pathname === '/submit') {
        if (req.method === 'POST') {
            var body = '';
            req.on('data', function(chunk) {
                body += chunk;
            });
            req.on('end', function() {
                var comment = qs.parse(body).comment;
                comments.push(comment);
                res.writeHead(302, { 'Location': '/' });
                res.end();
            });
        }
    } else if (pathname === '/getComments') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(comments));
        res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        res.end();
    }
});
server.listen(3000, function() {
    console.log('Server is running at http://localhost:3000');
});