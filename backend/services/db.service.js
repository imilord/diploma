const MongoClient = require('mongodb').MongoClient;

const config = require('../config')

module.exports = {
    getCollection
};

// Database Name
const dbName = 'test_db';

var dbConn = null;

async function getCollection(collectionName) {
    const db = await connect();
    return db.collection(collectionName);
}

async function connect() {
    if (dbConn) return dbConn;
    try {
        const url = config.dbURL;
        // const url = "mongodb://test_user:test_password@localhost:27017/test_db";
        const client = await MongoClient.connect(url, {useUnifiedTopology: true});
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch (err) {
        console.log('Cannot Connect to DB', err);
        throw err;
    }
}