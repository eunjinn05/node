const express = require('express');
const app = express();

// req.body json으로 읽게함
app.use(express.json());

// css 위치 읽게함 ('/public' prefix 사용)
app.use('/public', express.static('express/views'));
// view 위치 읽게함
app.set('views', 'express/views');
// view engine 선언
app.set('view engine', 'pug');

const musicRouter = express.Router();
app.use('/music', musicRouter);

let playList = [
    {
        idx: 1,
        artist: 'Beenzino',
        song: 'sorry',
    },
    {
        idx: 2,
        artist: 'Young K',
        song: '이것밖에는 없다',
    },
    {
        idx: 3,
        artist: 'Woodz',
        song: '난 너없이',
    },
];

// 1. 노래 리스트
musicRouter.get('/list', (req, res) => {
    res.send(playList);
});

// 2. 노래 추가
musicRouter.post('/add', (req, res) => {
    const count = playList.length;
    songObj = req.body;
    songObj.idx = count + 1;
    playList.push(songObj);
    res.send('Add Song');
});

// 3. 노래 삭제
musicRouter.post('/delete', (req, res) => {
    playList = playList.filter((arr) => arr.idx != req.body.idx);
    console.log(playList);
    res.send('Delete Song');
});

// png render
app.get('/', (req, res) => {
    res.render('index', {
        message: 'hello, pug',
    });
});

const PORT = 5002;
app.listen(PORT, () => {
    console.log(`Listening Server ${PORT}`);
});
