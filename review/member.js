const express = require('express');
const app = express();
const multer = require('multer');
const uploads = multer({ dest: 'uploads' });

const router = express.Router();

// ==================================Server ==================================================
const members = {
    1: {
        id: 'A',
        profileImage: undefined,
    },
    2: {
        idx: 2,
        id: 'B',
        profileImage: undefined,
    },
};

router.get('/:id', (req, res) => {
    res.render('index', {
        nickname: members.nickname,
        useId: req.params.id,
        profileImageUrl: `/uploads/${members.profileImage}`,
    });
});

router.post('/:id/profile', uploads.single('profile'), (req, res, next) => {
    const { filename } = req.file;
    members.profileImage = filename;
    res.send('User profile image uploaded' + filename);
});

router.get('/getId/:id', (req, res) => {
    // json / html 중 가장 적절한 데이터 보내줌
    const resMineType = req.accepts(['json', 'html']);

    if (resMineType == 'json') {
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
    } else {
        res.render('user-profile');
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
