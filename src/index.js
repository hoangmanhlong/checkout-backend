// Load environment variables from .env file
import "dotenv/config";

// Import dependencies
import { constants } from './config/index.js';
import express from "express";
import morgan from "morgan";
import database from './databases/index.js';
import utils from "./utils/utils.js";

// Get port from environment and validate
const port = constants.PORT;
if (!port) {
    throw new Error("Port not configured");
}

// Create Express app
const app = express();

// Middleware to parse JSON in request body
app.use(express.json());

// Enable request logging only in development environment
if (utils.isDevEnv()) {
    app.use(morgan('combined'));
}

// Define base route
app.get('/', (_req, res) => res.send("This is checkout backend!"));

// Initialize database before starting server
database.initialize()
    .then(() => {
        console.log('Database connected');
        // Start the server after DB is ready
        app.listen(port, () => {
            console.log(`Checkout backend is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Failed to initialize database:', err);
        process.exit(1);
    });

// Graceful shutdown handler for SIGINT, SIGTERM, and nodemon restarts (SIGUSR2)
const gracefulShutdown = () => {
    database.teardown()
        .catch(() => {
            console.warn('Error closing database connection');
        })
        .then(() => {
            console.log('Gracefully shutting down...');
            process.exit();
        });
};

// Listen to system signals for shutdown
process.on('SIGINT', gracefulShutdown);   // e.g. Ctrl+C
process.on('SIGTERM', gracefulShutdown);  // e.g. Docker stop
process.on('SIGUSR2', gracefulShutdown);  // e.g. nodemon restart
