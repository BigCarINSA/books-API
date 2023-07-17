const index = require('./index');
const bookRouter = require('./book');

function route(app) {
    app.use('/api/books', bookRouter);
    app.use('/', index); //Home page
}

module.exports = route;
