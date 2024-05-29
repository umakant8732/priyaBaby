import BbaCourseModel from '../../models/master/bbacourse.model.js';

const createBbaCourse = async (req, res, next) => {
  try {
    const { semester, Subjects, electives } = req.body;

    if (!semester) {
      res.status(400).send('Semester is required');
    }
    const bbaCourse = new BbaCourseModel({
      semester,
      Subjects,
      electives,
    });
    const result = await bbaCourse.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getBbaCourses = async (req, res, next) => {
  try {
    const result = await BbaCourseModel.find({ deleted: false });

    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getBbaCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await BbaCourseModel.findById(id);
    if (result.deleted === true) {
      res.status(404).send('Not Found');
    }
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateBbaCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { semester, Subjects, electives } = req.body;
    if (!semester) {
      res.status(400).send('Semester is required');
    }
    const result = await BbaCourseModel.findByIdAndUpdate(
      id,
      { semester, Subjects, electives },
      { new: true }
    );
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteBbaCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await BbaCourseModel.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export {
  createBbaCourse,
  getBbaCourses,
  getBbaCourse,
  updateBbaCourse,
  deleteBbaCourse,
};
