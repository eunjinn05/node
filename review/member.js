const express = require('express');
const app = express();

const router = express.Router();

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
    const findData = members.find((arr) => (arr.idx = findId));
    res.send('Find id : ' + JSON.stringify(findData));
});

module.exports = router;
