const express = require('express');
const app = express();

const router = require('./member');
app.use('/member', router);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`SERVER ${PORT} ON`);
});
