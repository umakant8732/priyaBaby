import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

export const signup = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const existingUser = await UserModel.findOne({ userName });
    if (existingUser) {
      return next(errorHandler(400, 'userName already exists'));
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new UserModel({ userName, password: hashPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await UserModel.findOne({ userName });
    if (!user) {
      return next(errorHandler(404, 'User does not found'));
    }
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: _, ...User } = user.toObject();
    res.cookie('access_token', token, {
      httpOnly: true,
    });
    
    res
      .status(200)
      .json({ message: 'User logged in successfully', User, token });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

