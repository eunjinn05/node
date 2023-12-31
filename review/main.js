const express = require('express');
const app = express();

const router = require('./member');
app.use('/member', router);

// Error middleware 처리
app.use((err, req, res, next) => {
    res.statusCode = err.statusCode || 500;
    res.send(err.message);
});

//==================================Pug rendering ===========================================

app.set('view engine', 'pug');
app.use('/public', express.static('review/src'));
app.use('/uploads', express.static('uploads'));
app.set('views', 'review/member');

//==================================Pug rendering ===========================================

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`SERVER ${PORT} ON`);
});

module.exports = app;
