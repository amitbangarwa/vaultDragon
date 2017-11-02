module.exports = (app) => {

    const common = require('../logic/common')(app);

    app.get('/api/object', common.getAllObjects);

    app.get('/api/object/:key', common.getObject);

    app.post('/api/object', common.createObject);
};