/**
 * 블로그 포스팅 서비스
 *
 */

const http = require('http');
const { routes } = require('./main_api');

const server = http.createServer((req, res) => {
    async function main() {
        const route = routes.find(
            (_routes) =>
                req.url &&
                req.method &&
                _routes.url.test(req.url) &&
                _routes.method == req.method
        );

        if (!route) {
            res.statusCode = 404;
            res.end('Not found');
            return false;
        }
        const regexResult = route.url.exec(req.url);
        if (!regexResult) {
            res.statusCode = 404;
            res.end('Not found.');
            return false;
        }

        const body = await new Promise((resolve, reject) => {
            req.setEncoding('utf-8');
            req.on('data', (data) => {
                try {
                    resolve(JSON.parse(data));
                } catch {
                    reject(new Error('Not invaild form'));
                }
            });
        });

        const result = await route.callback(regexResult, body);
        res.statusCode = result.statusCode;
        if (typeof result.body == 'string') {
            res.end(result.body);
        } else {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify(result.body));
        }
    }
    main();
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`This server is listening at ${PORT}`);
});
