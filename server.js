const app = require('./app');
const sequelize = require('./config/connection')
const dotenv = require("dotenv");

// This will shutdown the server in case an uncaught Exception pops up
process.on("uncaughtException", (err) => {
    console.log(err.name, err.message);
    console.log("Uncaught exception! Shutting down.");
    process.exit(1);
});

dotenv.config({path: "./config.env"});


// This starts the server.
sequelize.sync().then(() => {
    const server = app.listen(process.env.PORT, () => {
        console.log(`App running at port ${process.env.PORT}`);
    });
})


process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    console.log("Unhandled rejection! Shutting down.");
    server.close(() => {
        process.exit(1);
    });
});


