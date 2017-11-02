module.exports = app => {
    app.get('/', (req, res) => {
        res.render('index.html');
    });

    app.get('/home', (req, res) => {
        res.render('home.html');
    });

    app.get('/error', (req, res) => {
        res.render('error.html');
    });
};
