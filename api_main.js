const postData = [
    {
        id: 'test',
        title: 'My first post',
        content: 'Hello',
    },
    {
        id: 'test1',
        title: 'My second post',
        content: 'Hello! It is second post',
    },
];

const routes = [
    {
        url: /^\/posts$/,
        method: 'GET',
        callback: async () => ({
            statusCode: 200,
            body: postData,
        }),
    },
    {
        url: /^\/posts\/([a-zA-Z0-9-_]+)$/,
        method: 'GET',
        callback: async (matches) => {
            const postId = matches[1];
            if (!postId) {
                return {
                    statusCode: 404,
                    body: 'Not found',
                };
            }

            const posts = postData.find((po) => po.id == postId);

            if (!posts) {
                return {
                    statusCode: 404,
                    body: 'Not found',
                };
            }

            return {
                statusCode: 200,
                body: posts,
            };
        },
    },
    {
        url: /^\/posts$/,
        method: 'POST',
        callback: async (_, body) => {
            if (!body) {
                return {
                    status: 400,
                };
            }
            postData.push(body);
            return {
                statusCode: 200,
                body: postData,
            };
        },
    },
];

module.exports = {
    routes,
};
