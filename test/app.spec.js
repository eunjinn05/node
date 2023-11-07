// test('out first test', () => {
//     expect(1 + 2).toBe(3);
// });

const supertest = require('supertest');
const app = require('../review/main.js');

const request = supertest(app);

test('out first test', async () => {
    const result = await request.get('/member/get').accept('application/json');
    console.log(result);
});
