import dotenv from "dotenv"
import express from "express"
import morgan from "morgan"

dotenv.config()
const port = parseInt(process.env.PORT, 10);
if (!port) {
    throw new Error('PORT is not exsit')
}

const env = process.env.ENVIRONMENT || "DEVELOPMENT"

const app = express()
app.use(express.json());

if(env == "DEVELOPMENT") {
    app.use(morgan('combined'))
}

app.get('/', (req, res) => res.send('This is checkout backend!'))

app.listen(port, () => console.log(`Checkout backend is running in port ${port}`))

const gracefulShutdown = () => {
    console.log('Gracefully shutting down...');
    process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
