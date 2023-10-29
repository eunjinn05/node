const express = require('express');
const app = express();

const userRouter = express.Router();
app.use(express.json());
app.use('/users', userRouter);

const PORT = 5001;

const USER_DATA = {
    15: {
        nickname: 'nick',
    },
};

userRouter.get('/', (req, res) => {
    res.send('GET');
});

userRouter.param('id', (req, res, next, value) => {
    req.user = USER_DATA[value];
    next();
});

userRouter.post('/:id/nickname', (req, res) => {
    const { user } = req;
    newNick = req.body.nickname;
    user.nickname = newNick;
    res.send('Update nickname');
});

userRouter.get('/:id', (req, res) => {
    res.send(req.user);
});

userRouter.post('/', (req, res) => {
    res.send('register user');
});

app.listen(PORT, () => {
    console.log(`SERVER CONNECTED WITH ${PORT} PORT`);
});
