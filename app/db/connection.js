module.exports = app => {

    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');
    const config = app.get('config');
    const connectionString = process.env.DATABASE_URL || config.db.url;
    MongoClient.connect(connectionString, function(err, db) {
        assert.equal(null, err);
        console.log("Connected to mongodb server.");
        app.set('db', db);
        //db.close();
    });
};