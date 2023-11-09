const express = require('express');
const app = express();

const router = require('./member');
app.use('/member', router);

app.use((err, req, res, next) => {
    res.statusCode = err.statusCode || 500;
    res.send(err.message);
});

app.set('view engine', 'pug');
app.use('/public', express.static('review2/src'));
app.set('views', 'review2/views');

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening ${PORT} `);
});
