import express from 'express';
import { createBbaCourse, getBbaCourses, getBbaCourse, updateBbaCourse,deleteBbaCourse } from '../../controllers/masters/BbaCourse.controller.js';

const BbaCourseRouter = express.Router();

BbaCourseRouter.post('/', createBbaCourse);
BbaCourseRouter.get('/', getBbaCourses);
BbaCourseRouter.get('/:id', getBbaCourse);
BbaCourseRouter.put('/:id', updateBbaCourse);
BbaCourseRouter.put('/delete/:id', deleteBbaCourse);

export default BbaCourseRouter;
