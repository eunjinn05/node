const HTTP = require('http');
const PORT = 4000;
const { routes } = require('./api_lecture');

const server = HTTP.createServer((req, res) => {
    let route = routes.find(
        (_route) =>
            _route.url &&
            req.url &&
            _route.method === req.method &&
            _route.url.test(req.url)
    );

    if (route) {
        req.setEncoding('utf-8');
        req.on('data', (data) => {
            const callres = route.callback(data);

            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.statusCode = callres.statusCode;
            res.end(JSON.stringify(callres.body));
        });
    } else {
        res.statusCode = 404;
        res.end('Not Found.');
    }
});

server.listen(PORT, () => {
    console.log(PORT + ' SERVER ON!');
});
