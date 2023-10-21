const fs = require('fs');

const rs = fs.createReadStream('local/big-file', {
    encoding: 'utf-8',
});

let chunkCount = 0;
// 읽어오는 데이터
rs.on('data', (data) => {
    // 모든 데이터 읽어오는게 아닌 데이터 chunk 단위로 읽어옴
    // stream은 큰 데이터를 처리하기 위해 여러 데이터 chunk로 쪼개서 가져옴
    console.log('data : ' + data[0]);
    chunkCount++;
});

//모든 읽기 끝나고 호출
rs.on('end', () => {
    console.log('end' + chunkCount);
});
