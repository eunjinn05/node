const myPlaylist = [
    {
        singer: 'exo',
        song: 'Overdose',
    },
    {
        singer: 'shinee',
        song: 'lovesick',
    },
];

const routes = [
    {
        url: /^\/addList$/,
        method: 'POST',
        callback: (body) => {
            if (!body) return { statusCode: 404 };
            myPlaylist.push(body);
            return {
                statusCode: 200,
                body: myPlaylist,
            };
        },
    },
    {
        url: /^\/list$/,
        method: 'GET',
        callback: () => ({
            statusCode: 200,
            body: myPlaylist,
        }),
    },
];

module.exports = {
    routes,
};
