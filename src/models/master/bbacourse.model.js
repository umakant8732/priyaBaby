import mongoose from "mongoose";

const BbaCourseSchema = new mongoose.Schema({
    semester: {
        type: String,
        required: true,
    },
    courseName: {
        default: "BBA",
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
}, { timestamps: true });

const BbaCourseModel = mongoose.model("BbaCourse", BbaCourseSchema);
export default BbaCourseModel;