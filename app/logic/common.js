module.exports = app => {
    const collections = app.get('config').db.collections;
    const db = require('../db/queries')(app);

    function getAllObjects(req, res, next) {
        db.get({collection: collections.objects, query: {}}).then(data => {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Retrieved All Objects'
            });
        }).catch(err => {
            return next(err);
        });
    }

    function get(payload, next, callback) {
        db.get(payload).then(data => {
            callback(data);
        }).catch(err => {
            return next(err);
        });
    }

    function getObject(req, res, next) {
        let params = req.params;
        let query = req.query;
        if (Object.keys(params).length !== 0 && Object.keys(query).length !== 0) {
            let payload = {
                collection: collections.objects,
                query: {
                    key: params.key,
                    timestamp: query.timestamp
                }
            };
            get(payload, next, data => {
                res.status(200).json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved Object'
                });
            });
        } else {
            let payload = {
                collection: collections.objects,
                query: {
                    key: params.key
                }
            };
            get(payload, next, data => {
                res.status(200).json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved Object'
                });
            });
        }
    }

    function createObject(req, res, next) {
        let postData = req.body;
        postData.timestamp = parseInt(new Date().getTime());
        if (postData) {
            let getPayload = {
                collection: collections.objects,
                query: {
                    key: postData.key
                }
            };
            get(getPayload, next, data => {
                if (data.length > 0) {
                    updateObject(postData, next, (result) => {
                        res.status(200).json({
                            status: 'success',
                            data: result,
                            message: result + ' objects updated'
                        });
                    });
                } else {
                    let payload = {
                        collection: collections.objects,
                        query: postData
                    };
                    db.create(payload).then(data => {
                        res.status(200).json({
                            status: 'success',
                            data: data,
                            message: 'Object Created'
                        });
                    }).catch(err => {
                        return next(err);
                    });
                }
            });
        } else {
            return next('Post data not found');
        }
    }

    function updateObject(postData, next, callback) {
        let payload = {
            collection: collections.objects,
            query: {
                key: postData.key
            },
            update: postData
        };
        db.update(payload).then(data => {
            callback(data);
        }).catch(err => {
            return next(err);
        });
    }

    return {

        getAllObjects: getAllObjects,
        getObject: getObject,
        createObject: createObject,
        updateObject: updateObject
    }
};