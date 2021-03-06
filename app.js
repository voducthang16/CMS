const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session =  require('express-session');
const bodyParser = require('body-parser');
const app = express();

const indexRouter = require('./routes/index');
const listRouter = require('./routes/list');
const roomRouter = require('./routes/room');
const subjectRouter = require('./routes/subject');
const scheduleRouter = require('./routes/schedule');
const registrationRouter = require('./routes/registration');

const db = require('./config');
db.connect();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'vdt',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

// Define REST API
const usersAPIRouter = require('./api/users');
const roomsAPIRouter = require('./api/rooms');
const subjectsAPIRouter = require('./api/subjects');
const detailsAPIRouter = require('./api/details');

app.use('/', indexRouter);
app.use('/list', listRouter);
app.use('/room', roomRouter);
app.use('/subject', subjectRouter);
app.use('/schedule', scheduleRouter);
app.use('/registration', registrationRouter);
// API Route
app.use('/api/users', usersAPIRouter);
app.use('/api/rooms', roomsAPIRouter);
app.use('/api/subjects', subjectsAPIRouter);
app.use('/api/details', detailsAPIRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
