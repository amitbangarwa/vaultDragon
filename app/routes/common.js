module.exports = (app) => {

    const common = require('../logic/common')(app);

    app.route('/api/object')
        .get(common.getAllObjects)
        .post(common.createObject);

    app.route('/api/object/:key')
        .get(common.getObject);
};