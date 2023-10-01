const myPlayList = [];

const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url == '/addList' && req.method == 'POST') {
        req.setEncoding('utf-8');
        res.setHeader('Content-type', 'application/json; charset=utf-8');
        req.on('data', (music) => {
            const musicObj = JSON.parse(music);
            myPlayList.push(musicObj);
            res.statusCode = 200;
            res.end('등록 완료');
        });
    } else if (req.url == '/list' && req.method == 'GET') {
        req.setEncoding('utf-8');
        res.setHeader('Content-type', 'application/json; charset=utf-8');

        const myList = myPlayList.map((data) => ({
            singer: data.singer,
            song: data.song,
        }));

        res.statusCode = 200;
        res.end(JSON.stringify(myList));
    } else if (
        req.url &&
        req.method == 'GET' &&
        /^\/findSong\/([a-zA-Z0-9가-힣-_]+)$/.exec(req.url)
    ) {
        req.setEncoding('utf-8');
        res.setHeader('Content-type', 'application/json; charset=utf-8');
        const findSong = /^\/findSong\/([a-zA-Z0-9가-힣-_]+)$/.exec(req.url)[1];

        const findList = myPlayList.find((song) => song.song == findSong);
        if (findList) {
            res.statusCode = 200;
            res.end(JSON.stringify(findList));
        } else {
            res.statusCode = 404;
            res.end('no List');
        }
    }
});

server.listen(PORT, () => {
    console.log('SERVER ON');
});
