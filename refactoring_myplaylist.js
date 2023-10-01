const http = require('http');

const { routes } = require('./api_myplaylist');

const server = http.createServer((req, res) => {
    async function main() {
        const route = routes.find(
            (_route) =>
                req.url &&
                req.method &&
                _route.url.test(req.url) &&
                _route.method == req.method
        );

        // routes 자체가 없을 때
        if (!routes || req.url == '/' || !route) {
            res.statusCode = 404;
            res.end('Routes NOT FOUND');
            return false;
        }

        const regexResult = route.url.exec(req.url);
        let inputData;
        if (regexResult) {
            if (regexResult[0] == '/addList') {
                inputData = await new Promise((resolve, reject) => {
                    req.setEncoding('utf-8');
                    req.on('data', (inputData) => {
                        try {
                            resolve(JSON.parse(inputData));
                        } catch {
                            reject(new Error('Not invaild form'));
                        }
                    });
                });
            }
            const result = await route.callback(inputData);
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.statusCode = result.statusCode;
            res.end(JSON.stringify(result.body));
        } else {
            // 일치하는 url 없을 때
            res.statusCode = 404;
            res.end('NOT FOUND');
            return false;
        }
    }
    main();
});

const PORT = 3500;
server.listen(PORT, () => {
    console.log('SERVER ON');
});
