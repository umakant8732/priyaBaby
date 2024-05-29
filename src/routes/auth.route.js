import express from 'express';
import {signup,getAllUsers } from '../controllers/auth.controller.js';
import { login } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
// router.post('/forgotpassword', forgotPassword)
// router.post('/resetpassword/:id/:token', resetPassword)
router.get('/users', getAllUsers)


export default router;