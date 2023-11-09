const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
    'mongodb+srv://eunjinn05:dmswls12@cluster0.mmxplba.mongodb.net/?retryWrites=true&w=majority';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function main() {
    await client.connect();

    const users = client.db('fc21').collection('users');
    await users.deleteMany({});
    await users.insertMany([
        {
            name: 'Foo',
            birthYear: 2000,
            contacts: [
                {
                    type: 'phone',
                },
            ],
        },
        { name: 'Bar', birthYear: 1995 },
        { name: 'Baz', birthYear: 1990 },
        { name: 'poo', birthYear: 1993 },
    ]);
    await users.deleteOne({
        name: 'Baz',
    });

    await users.updateOne({ name: 'Baz' }, { $set: { name: 'boo' } });

    const cursor = users.find(
        {
            birthYear: {
                // great than equal
                $gte: 1990,
            },
        },
        {
            sort: {
                // 1 내림차순 / -1 올림차순
                birthYear: 1,
            },
        },
        // Query 작성법
        { 'contacts.type': 'phone' },
    );
    await cursor.forEach(console.log);

    await client.close();
}

main();
