// add query functions
const assert = require('assert');
module.exports = app => {

    function get(payload) {
        return new Promise((resolve, reject) => {
            app.get('db').collection(payload.collection).find(payload.query).toArray((err, docs) => {
                if (!err) {
                    resolve(docs);
                } else {
                    reject(err);
                }
            });
        });
    }

    function create(payload) {
        return new Promise((resolve, reject) => {
            app.get('db').collection(payload.collection).insertOne(payload.query, (err, docs) => {
                if (!err) {
                    resolve(docs.ops);
                } else {
                    reject(err);
                }
            });
        });
    }

    function update(payload) {
        return new Promise((resolve, reject) => {
            app.get('db').collection(payload.collection).updateMany(payload.query, {$set: payload.update}, (err, docs) => {
                if (!err) {
                    resolve(docs.modifiedCount);
                } else {
                    reject(err);
                }
            });
        });
    }


    return {
        get: get,
        create: create,
        update: update
    }
};
