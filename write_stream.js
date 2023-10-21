const fs = require('fs');

const ws = fs.createWriteStream('local/big-file');

const NUM_MBYTES = 500;

for (let i = 0; i < NUM_MBYTES; i++) {
    ws.write('a'.repeat(1024 * 1024));
}
