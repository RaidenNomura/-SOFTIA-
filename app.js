const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const appConfig = require('./config');
const indexRouter = require('./routes/index');
const showRouter = require('./routes/show');
const app = express();
const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'data_stock',
    port: 5000
});

connection.connect();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', appConfig.express.port || process.env.PORT || 3000);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    req.db = connection;
    next();
});
app.use('/', indexRouter);
app.use('/show', showRouter);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error', {
        title: `Error ${err.status}`,
        user: (req.user !== undefined ? req.user : null),
    });
});

app.listen(app.get('port'), (err) => {
    if (err) throw new Error('An error has occured when the server went to start.');
    console.log(`The server is running on port ::${app.get('port')}:: !`);
});

module.exports = app;
