// PACKAGE IMPORTS
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const AppError = require("./utils/appError");

// ROUTES IMPORTS
const indexRouter = require('./routes/index');
const userRouter = require('./routes/userRoute');

// EXPRESS
const app = express();

// Serve public folder
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// MIDDLEWARES

// Logger
if (process.env.NODE_ENV === "development") app.use(logger("dev"));

// Body parser
app.use(express.json({limit: "10kb"}));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Set security HTTP Headers.
app.use(helmet());

// Data sanitization against XSS
app.use(xss());

// ROUTES
app.use('/', indexRouter);
app.use('/user', userRouter);

// ERROR HANDLERS
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404)); // <--- When this catches an error.
});

// @TODO: Build this controller.
// app.use(globalErrorHandler); // <--- this functions process the error.


// catch 404 and forward to error handler. This is a generic error handler, keep this commented for the meantime.
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// IGNORE THIS FUNCTION IN THE MEANTIME.
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

// EXPORT
module.exports = app;
