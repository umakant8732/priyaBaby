import mongoose from "mongoose"


const mbaSchema = new mongoose.Schema({
  sirname: { type: String, trim : true },
  firstName: { type: String, trim: true },
  fathersName: { type: String, trim : true },
  mothersName: { type: String, trim : true },
  fromMaharashtra: { type: String, trim : true },
  yearAdmitted: { type: String, trim : true },
  originalCategory: { type: String, trim : true},
  religion: { type: String, trim : true },
  casteAndSubcaste: { type: String, trim : true },
  graduationCompletedFrom: { type: String, trim : true },
  specialization_1: { type: String, trim : true },
  specialization_2: { type: String, trim : true },
  antiRaggingReferenceNumber: { type: String, trim : true },
  dob: { type: String, trim : true },
  placeOfBirth: { type: String, trim : true },
  gender: { type: String, trim : true },
  physicallyHandicapped: { type: String, trim : true },
  disability: { type: String, trim : true },
  localGuardianName: { type: String, trim : true },
  localGuardianRelation: { type: String, trim : true },
  localGuardianMobile1: { type: String, trim : true },
  localGuardianMobile2: { type: String, trim : true },
  localGuardianAddress: { type: String, trim : true },
  permanentAddress: { type: String, trim : true },
  district: { type: String, trim : true },
  state: { type: String, trim : true },
  pinCode: { type: String, trim : true },
  fathersMobileNo1: { type: String, trim : true },
  fathersMobileNo2: { type: String, trim : true },
  mothersMobileNo1: { type: String, trim : true },
  mothersMobileNo2: { type: String, trim : true },
  studentsMobileNo1: { type: String, trim : true },
  studentsMobileNo2: { type: String, trim : true },
  studentsWhatsappNo1: { type: String, trim : true },
  universityEnrollmentNo: { type: String,  trim : true },
  studentsWhatsappNo2: { type: String,  trim : true },
  studentsEmail: { type: String,  trim : true },
  fathersEmail: { type: String,  trim : true },
  fathersOccupation: { type: String,  trim : true },
  designation: { type: String,  trim : true },
  scholarship: { type: String,  trim : true },
  graduationPercentageOfMarks: { type: String,  trim : true },
  graduationYearOfPassing: { type: String,  trim : true },
  otherPercentage: { type: String,  trim : true },
  otherYear: { type: String,  trim : true },
  deleted: { type: Boolean, default: false },
}, { timestamps: true,  trim : true });

const MbaFormModal = mongoose.model('MbaFormModal', mbaSchema);

export default MbaFormModal;