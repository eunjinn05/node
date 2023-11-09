const express = require('express');
const app = express();

const router = express.Router();

const memData = [
    {
        id: 1,
        nickname: 'nicky',
    },
    {
        id: 2,
        nickname: 'james',
    },
];

router.get('/list', (req, res) => {
    res.send(memData);
});

router.post('/update/:id/:nickname', (req, res) => {
    const id = req.params.id;
    const nickname = req.params.nickname;
    let updateMember = memData.find((mem) => mem.id == id);
    updateMember.nickname = nickname;

    res.send('Updated member');
});

router.post('/add/:id/:nickname', (req, res) => {
    const newData = req.params;
    memData.push(newData);

    res.send('Updated member');
});

router.post('/add/:id/:nickname', (req, res) => {
    memData.push(newData);
    res.send('Updated member');
});

router.post('/del/:id', (req, res) => {
    const id = req.params.id;
    memData.forEach((item, index) => {
        if (item.id == id) {
            memData.splice(index, 1);
            res.send('Deleted member');
        } else {
            const err = new Error('Invaild data.');
            err.statusCode = 500;
            throw err;
        }
    });
});

module.exports = router;
