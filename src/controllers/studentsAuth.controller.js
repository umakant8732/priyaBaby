import StudentAuthModel from '../models/studentAuth.model.js';
import nodeMailer from 'nodemailer';

const SendEmailInOTP = async (email, mobileNo, OTP) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'ar1467306@gmail.com',
        pass: 'wyzg umqc xffo ksoq',
      },
    });

    const mailOptions = {
      from: 'Priyadarshini LTIMSR <admin@priyadarshinimba.com>',
      to: email,
      subject: `Verification code for Mobile No. ${mobileNo}`,
      html: `
          <div style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f7f7f7; color: #333; border-radius: 5px;">
            <h2 style="color: #333;">Hello Student,</h2>
            <p style="color: #333;">Your OTP is: <strong>${OTP}</strong></p>
            <p style="color: #333;">Your account can’t be accessed without this verification code, even if you didn’t submit this request.</p>
            <p style="color: #333;">For any queries send an email to, with screen shot at <a href="mailto:students.priyadarshini@gmail.com ">   

            <b>We recommend you to use a laptop or computer to get the best view of the online admission website.</b>
            <br>
            <hr>
            <p style="color: #333;">Since this email contains sensitive information about your account details we would suggest you to keep this email safe. Also, for security reasons please ensure that you do not share these verification code with anyone.</p>
            <br>
            <p style="color: #333;">Regards,</p>
            <p style="color: #333;">Priyadarshini LTIMSR</p>
          </div> +
        `,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const registerStudent = async (req, res, next) => {
  try {
    const { email, mobileNo } = req.body;
    const RandomOTP = Math.floor(1000 + Math.random() * 9000);
    const existAdadhar = await StudentAuthModel.findOne({ mobileNo });
    if (existAdadhar) {
      return res.status(400).json({ message: 'Mobile No. already exists' });
    }
    const existEmail = await StudentAuthModel.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const student = await StudentAuthModel.create({
      email: '',
      mobileNo: '',
      OTP: RandomOTP,
      course: '',
    });
    SendEmailInOTP(email, mobileNo, RandomOTP);
    await student.save();
    return res.status(201).json({
      success: true,
      student,
      message: 'OTP sent to your email',
    });
  } catch (error) {
    next(error);
  }
};

export const OTPVerification = async (req, res, next) => {
  try {
    const { registerInput, OTP, keyword } = req.body;
    console.log(registerInput);
    const student = await StudentAuthModel.findOne({ OTP });
    if (!student) {
      res.status(404).json({
        success: false,
        message: 'Invalid OTP',
      });
    }
    student.OTP = '';
    student.email = registerInput.email;
    student.mobileNo = registerInput.mobileNo;
    student.course = keyword;
    await student.save();
    return res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
      data: {
        email: student.email,
        mobileNo: student.mobileNo,
        role: student.role,
        course: student.course,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginStudent = async (req, res, next) => {
  try {
    const { mobileNo } = req.body;
    const student = await StudentAuthModel.findOne({ mobileNo });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found 😒',
      });
    }
    student.OTP = Math.floor(1000 + Math.random() * 9000);
    await student.save();
    SendEmailInOTP(student.email, student.mobileNo, student.OTP);
    return res.status(200).json({
      success: true,
      student,
      message: 'OTP sent to your email',
      data: {
        studentId: student._id,
        email: student.email,
        mobileNo: student.mobileNo,
        role: student.role,
        course: student.course,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getStudent = async (req, res, next) => {
  try {
    const student = await StudentAuthModel.find();
    return res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentById = async (req, res, next) => {
  try {
    const student = await StudentAuthModel.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }
    return res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const student = await StudentAuthModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }
    return res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const student = await StudentAuthModel.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
