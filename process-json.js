const fs = require('fs');

const rs = fs.createReadStream('local/jsons', {
    encoding: 'utf-8',
});

let totalSum = 0;

rs.on('data', (data) => {
    if (typeof data !== 'string') {
        return;
    }

    totalSum += data
        .split('\n')
        .map((jsonline) => {
            try {
                return JSON.parse(jsonline);
            } catch {
                return 0;
            }
        })
        .filter((json) => json)
        .map((json) => json.a)
        .reduce((sum, curr) => sum + curr, 0);
});

rs.on('end', () => {
    console.log('emd');
    console.log(totalSum);
});
