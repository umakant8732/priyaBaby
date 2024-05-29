import express from 'express';
import {
  createMbaCourse,
  getMbaCourses,
  updateMbaCourse,
  deleteMbaCourse,
  getMbaCourse,
} from '../../controllers/masters/MbaCourse.controller.js';

const MbaCourseRouter = express.Router();

MbaCourseRouter.post('/', createMbaCourse);
MbaCourseRouter.get('/', getMbaCourses);
MbaCourseRouter.get('/:id', getMbaCourse);
MbaCourseRouter.put('/:id', updateMbaCourse);
MbaCourseRouter.put('/delete/:id', deleteMbaCourse);

export default MbaCourseRouter;
