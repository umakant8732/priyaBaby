import connection from '../../../index.js'
import MbaCourseModel from '../../models/master/mbacourse.model.js';

const createMbaCourse = async (req, res, next) => {
  try {
    const { semester, Subjects, electives } = req.body;
    // console.log(req.body);

    if (!semester || !Subjects) {
      return res.status(400).send('Please provide all required fields');
    }

    // Create a new MbaCourseModel instance
    const mbaCourse = new MbaCourseModel({
      semester,
      Subjects,
      electives,
    });

    // Save the new course to the database
    const result = await mbaCourse.save();

    // Send response
    res.status(201).json({ message: 'MbaCourse created successfully', result });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(500).send(error.message);
  }
};

const getMbaCourses = async (req, res, next) => {
  // try {
  //   // Find all MBA courses where deleted is false
  //   const result = await MbaCourseModel.find({ deleted: false });
  //   // console.log(result);
  //   // If no courses found, send 404 Not Found response
  //   if (!result.length) {
  //     return res.status(404).send('Not Found');
  //   }

  //   // Send the found courses
  //   res.status(200).json(result);
  // } catch (error) {
  //   // If an error occurs, send 500 Internal Server Error response
  //   console.error(error);
  //   res.status(500).send(error.message);
  // }
  try {
    const result = await MbaCourseModel.find({ deleted: false });
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

// const createMbaCourse = async (req, res, next) => {
//   try {
//     const { semester, Subjects } = req.body;
//     const subjectJson = JSON.stringify(Subjects);
//     if (!semester || !Subjects) {
//       return res.status(400).send('Please provide all required fields');
//     }
//     const query = `INSERT INTO mba_courses (semester, Subjects) VALUES ('${semester}', '${subjectJson}')`;

//     connection.query(query, (err, result) => {
//       if (err) {
//         return res.status(500).send(err);
//       }
//       return res
//         .status(201)
//         .json({ message: 'MbaCourse created successfully', result });
//     });
//   } catch (error) {
//     return res.status(500).send(error);
//   }
// };

// const getMbaCourses = async (req, res, next) => {
//   try {
//     const query = `SELECT * From mba_courses WHERE deleted = false`;
//     connection.query(query, (err, result) => {
//       if (err) {
//         res.status(500).send(err);
//       }
//       res.status(200).json(result);
//     });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

const updateMbaCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { semester, Subjects, electives } = req.body;

    // Convert Subjects to JSON string
    const subjectJson = JSON.stringify(Subjects);
    console.log(subjectJson);

    // Update the document in the database
    const result = await MbaCourseModel.findByIdAndUpdate(
      id,
      { semester, Subjects: JSON.parse(subjectJson) },
      { new: true } // Return the updated document
    );

    if (!result) {
      return res.status(404).json({ message: 'MbaCourse not found' });
    }

    res
      .status(200)
      .json({ message: 'MbaCourse updated successfully', data: result });
  } catch (error) {
    console.error('Error updating MbaCourse:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getMbaCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const result = await MbaCourseModel.findById(id);
    if (result.deleted === true) {
      res.status(404).send('Not Found');
    }
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

// const updateMbaCourse = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { semester, Subjects } = req.body;
//     console.log(req.body);
//     const subjectJson = JSON.stringify(Subjects);
//     const query = `UPDATE mba_courses SET semester = '${semester}', Subjects = '${subjectJson}' WHERE id = ${id}`;
//     connection.query(query, (err, result) => {
//       if (err) {
//         res.status(500).send(err);
//       }
//       res.status(200).json({ message: 'BbaCourse updated successfully' });
//     });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

const deleteMbaCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Update the document in the database
    const result = await MbaCourseModel.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true } // Return the updated document
    );

    if (!result) {
      return res.status(404).json({ message: 'MbaCourse not found' });
    }

    res
      .status(200)
      .json({ message: 'MbaCourse deleted successfully', data: result });
  } catch (error) {
    console.error('Error deleting MbaCourse:', error);
    res.status(500).send('Internal Server Error');
  }
};

// export const deleteMbaCourse = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const query = `UPDATE mba_courses SET deleted = true WHERE id = ${id}`;
//     connection.query(query, (err, result) => {
//       if (err) {
//         res.status(500).send(err);
//       }
//       res.status(200).json({ message: 'BbaCourse deleted successfully' });
//     });
//   } catch (error) {
//     res.send(500).send(error);
//   }
// };

export {
  createMbaCourse,
  getMbaCourses,
  updateMbaCourse,
  getMbaCourse,
  deleteMbaCourse,
};
