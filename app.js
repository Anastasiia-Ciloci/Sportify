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

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// ROUTES IMPORTS
const indexRouter = require('./routes/index');
const userRouter = require('./routes/userRoutes');
const workoutRouter = require('./routes/workoutRoutes');
const intensityRouter = require('./routes/intensityRoutes');
const commentRouter = require('./routes/commentRoutes');
const viewsRouter = require('./routes/viewsRoutes');

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
// if (process.env.NODE_ENV === "development") app.use(logger("dev"));
app.use(logger("dev"));

// Body parser
app.use(express.json({limit: "10kb"}));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Set security HTTP Headers.
app.use(helmet());

// Data sanitization against XSS
app.use(xss());

// ROUTES
app.use('/api/v1/user', userRouter);
app.use('/api/v1/workout', workoutRouter);
app.use('/api/v1/intensity', intensityRouter)
app.use('/api/v1/comment', commentRouter)
app.use('/', viewsRouter);
// Will probably add an index api file in the future and nest all the API routes inside.s


// ERROR HANDLERS
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404)); // <--- When this catches an error.
});

// Error handler
app.use(globalErrorHandler);

// EXPORT
module.exports = app;
