require("dotenv").config();
const {MongoClient} = require('mongodb');

module.exports = async function (req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: true,
            message: 'Bad message'
        });
    }

    const bodyProps = Object.keys(req.body);

    if (
        !bodyProps.includes('content') ||
        !bodyProps.includes('author')
    ) {
        return res.status(402).json({
            error: true,
            message: 'You must have content and author.'
        });
    }

    try {
        const mongo = await MongoClient.connect(process.env.DB_ACCESS, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const messagesCollection = await mongo.db().collection('messages');
        await messagesCollection.insertOne({ ...req.body });
        const messagesList = await messagesCollection.find().toArray();

        return res.status(200).json({
            messages: [ ...messagesList ]
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message
        })
    }
};