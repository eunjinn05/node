const express = require('express');
const app = express();

const router = express.Router();

// ==================================Server ==================================================
const members = [
    {
        idx: 1,
        id: 'A',
    },
    {
        idx: 2,
        id: 'B',
    },
];

router.get('/', (req, res) => {
    res.send('Hi I am root');
});

router.get('/getId/:id', (req, res) => {
    const findId = req.params.id;
    const findData = members.find((arr) => arr.idx == findId);
    // Error 생성
    if (!findData) {
        const err = new Error('Member not found');
        err.statusCode = 404;
        throw err;
    } else {
        res.send(findData);
    }
});

router.post('/register/:idx/:id', (req, res) => {
    members.push(req.params);
    res.send('Registered');
});

router.get('/list', (req, res) => {
    res.send(members);
});
// ==================================Server ==================================================

module.exports = router;
