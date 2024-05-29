import mongoose from 'mongoose';

const MbaCourseSchema = new mongoose.Schema(
  {
    semester: {
      type: String,
      required: true,
    },
    courseName: {
      default: 'MBA',
      type: String,
    },
    Subjects: {
      type: Array,
      required: true,
    },
    electives: {
      type: Array,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const MbaCourseModel = mongoose.model('MbaCourse', MbaCourseSchema);
export default MbaCourseModel;
