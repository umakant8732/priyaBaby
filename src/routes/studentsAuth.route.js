import express from 'express';
import {registerStudent,loginStudent,OTPVerification,getStudent,getStudentById,updateStudent,deleteStudent} from '../controllers/studentsAuth.controller.js';

const StudentAuthRouter = express.Router();

StudentAuthRouter.post('/register', registerStudent);
StudentAuthRouter.post('/login', loginStudent);
StudentAuthRouter.post('/verify', OTPVerification);


export default StudentAuthRouter;