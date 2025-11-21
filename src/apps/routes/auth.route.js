import express from "express";
import AuthController from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/login-google', AuthController.loginWithGoogle);

export default router;
