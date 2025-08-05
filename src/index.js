// Load environment variables from .env file
import "dotenv/config";

// Import dependencies
import { constants, logger } from './config/index.js';
import express from "express";
import morgan from "morgan";
import database from './databases/index.js';

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
if (constants.IS_DEVELOPMENT_ENVIRONMENT) {
    app.use(morgan('combined'));
}

// Define base route
app.get('/', (_req, res) => res.send("This is checkout backend!"));

// Initialize database before starting server
database.initialize()
    .then(() => {
        logger.info('Database connected');
        // Start the server after DB is ready
        app.listen(port, () => {
            logger.info(`Checkout backend is running on port ${port}`);
        });
    })
    .catch((err) => {
        logger.error('Failed to initialize database:', err);
        process.exit(1);
    });

// Graceful shutdown handler for SIGINT, SIGTERM, and nodemon restarts (SIGUSR2)
const gracefulShutdown = () => {
    database.teardown()
        .catch((error) => {
            logger.error(`Error closing database connection: ${error}`);
        })
        .then(() => {
            logger.info('Gracefully shutting down...');
            process.exit();
        });
};

// Listen to system signals for shutdown
process.on('SIGINT', gracefulShutdown);   // e.g. Ctrl+C
process.on('SIGTERM', gracefulShutdown);  // e.g. Docker stop
process.on('SIGUSR2', gracefulShutdown);  // e.g. nodemon restart
