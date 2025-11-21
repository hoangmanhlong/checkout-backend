import express from "express";
import authRoute from "./auth.route.js";
import { responseMiddleware } from '../middlewares/response.middleware.js';

const router = express.Router();

router.use(responseMiddleware);
router.use('/auth', authRoute);

export default router;