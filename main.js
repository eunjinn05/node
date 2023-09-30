/**
 * 블로그 포스팅 서비스
 *
 */

const postData = [
    {
        id: 'test',
        title: 'My first post',
        content: 'Hello',
    },
    {
        id: 'test1',
        title: 'My second post',
        content: 'Hello! It is second post',
    },
];

const http = require('http');

const server = http.createServer((req, res) => {
    const POST_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/;
    //req.url이 있고 정규식 데이터 (id) 가져옴
    // &&는 양쪽 조건 모두 돌려보고 맞으면 true
    // ||는 한쪽이라도(앞에 정규식) 틀리면 false -> url 없거나 id 없으면 undefined
    const postIdREGXRESULT =
        (req.url && POST_ID_REGEX.exec(req.url)) || undefined;

    if (req.url == '/posts' && req.method == 'GET') {
        const result = {
            posts: postData.map((post) => ({
                id: post.id,
                title: post.title,
                content: post.content,
            })),
            totalCount: postData.length,
        };

        res.setHeader('Content-type', 'application/json; charset=utf-8');
        res.statusCode = 200;
        res.end(JSON.stringify(result));
    } else if (postIdREGXRESULT && req.method == 'GET') {
        const postId = postIdREGXRESULT[1];
        const someoneblog = postData.find((post) => post.id === postId);

        if (someoneblog) {
            res.setHeader('Content-type', 'application/json; charset=utf-8');
            res.statusCode = 200;
            res.end(JSON.stringify(someoneblog));
        } else {
            res.statusCode = 404;
            res.end('Not found');
        }
    } else if (req.url == '/posts' && req.method == 'POST') {
        req.setEncoding('utf-8');
        res.setHeader('Content-type', 'application/json; charset=utf-8');
        req.on('data', (data) => {
            const body = JSON.parse(data);
            postData.push(body);
            console.log(postData);
        });
        res.statusCode = 200;
        res.end('creating post');
    } else {
        res.statusCode = 404;
        res.end('Not fount.');
    }
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`This server is listening at ${PORT}`);
});
