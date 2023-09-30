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
    } else if (req.url == '/findSong' && req.method == 'GET') {
    }
});

server.listen(PORT, () => {
    console.log('SERVER ON');
});
