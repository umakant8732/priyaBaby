import mongoose from 'mongoose';

const studentAuthSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    mobileNo: {
      type: String,
    },
    OTP: {
      type: Number,
    },
    course: {
      type: String,
    },
    role: {
      type: String,
      default: 'student',
    },
  },
  { timestamps: true }
);

const StudentAuthModel = mongoose.model('StudentAuth', studentAuthSchema);

export default StudentAuthModel;
