// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

// Import dependencies
import express from "express";
import morgan from "morgan";
import { app_database_init, app_database_close } from './databases/index.js';

// Get port from environment and validate
const port = parseInt(process.env.PORT, 10);
if (!port) {
    throw new Error('PORT is not set in environment variables');
}

// Get current environment (default to DEVELOPMENT)
const env = process.env.ENVIRONMENT || "DEVELOPMENT";

// Create Express app
const app = express();

// Middleware to parse JSON in request body
app.use(express.json());

// Enable request logging only in development environment
if (env === "DEVELOPMENT") {
    app.use(morgan('combined'));
}

// Define base route
app.get('/', (req, res) => res.send('This is checkout backend!'));

// Initialize database before starting server
app_database_init()
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
    app_database_close()
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
