import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './src/routes/auth.route.js'
import CategoryRouter from './src/routes/masters/Category.route.js';
import BbaCourseRouter from './src/routes/masters/BbaCourse.route.js';
import MbaCourseRouter from './src/routes/masters/MbaCourse.route.js';
import BBAFormRouter from './src/routes/admissionform/bbaForm.route.js';
import MBAFormRouter from './src/routes/admissionform/mbaForm.route.js';
import StudentAuthRouter from './src/routes/studentsAuth.route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRouter);
app.use('/master/category', CategoryRouter);
app.use('/master/bbaCourse', BbaCourseRouter);
app.use('/master/mbaCourse', MbaCourseRouter);
app.use('/admissionform/bbaForm', BBAFormRouter);
app.use('/admissionform/mbaForm', MBAFormRouter);
app.use('/student', StudentAuthRouter);

mongoose
  .connect(
    'mongodb+srv://umakantbhendarkar94:qyUlfR9XlNLReuBz@priyadarshani.owwvrk3.mongodb.net/'
  )
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.get("/", (req, res) => {
  res.send("working")
})

export default mongoose;

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
