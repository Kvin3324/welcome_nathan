require("dotenv").config();
const {MongoClient} = require('mongodb');

module.exports = async function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.method !== 'POST' || !req.method !== 'GET') {
        return res.status(405).json({
            error: true,
            message: 'Bad message'
        });
    }

    let mongo;
    let messagesCollections;

    try {
        mongo = await MongoClient.connect(process.env.DB_ACCESS, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        messagesCollections = mongo.db().collection('messages');
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message
        })
    }

    if (req.method === 'POST') {
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

        await messagesCollection.insertOne({ ...req.body });

        return res.status(200).json({
            message: 'Message added'
        });
    }

    if (req.method === 'GET') {
        const messagesList = await messagesCollections.find().toArray();

        return res.status(200).json({
            messages: [ ...messagesList ]
        });
    } 
};