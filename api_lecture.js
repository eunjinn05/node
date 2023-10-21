const data = [];
const routes = [
    {
        url: /^\/addLecture/,
        method: 'POST',
        callback: (_data) => {
            data.push(JSON.parse(_data));
            return {
                statusCode: 200,
                body: data,
            };
        },
    },
];

module.exports = { routes };
