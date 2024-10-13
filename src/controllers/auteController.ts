import User, { IUser, IGrade } from "../models/userModel";
import Classroom, { IClassroom } from "../models/classroomModel";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerTeacher = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, classroom } = req.body;

    const result = await examination(classroom);
    if (result) {
      res.status(400).json({
        message: "You cannot join this class",
        success: false,
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      classrooms: [],
      role: "teacher",
    });

    const newClassroom = await Classroom.create({
      name: classroom,
      teacher: user._id,
    });

    user.classrooms.push(newClassroom._id);
    await user.save();

    res.status(200).json({ classId: user.classrooms, success: true });
  } catch (error) {
    res.status(400).json({ message: error, success: false });
  }
};

const examination = async (className: string): Promise<boolean> => {
  const classroom = await Classroom.find({ name: className });
  if (classroom.length > 0) {
    return true;
  } else {
    return false;
  }
};

export const registerStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, classroom } = req.body;

    const result = await Classroom.findOne({ name: classroom });

    if (result === null) {
      res.status(404).json({
        message: "Class not found",
        success: false,
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      role: "student",
    });
    user.classrooms.push(result._id);
    await user.save();
    res.status(200).json({ data: user, success: true });
  } catch (error) {
    res.status(500).json({ message: error, success: false });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({ message: "User not found", success: false });
      return;
    }
    const DecryptedPassword = await bcrypt.compare(password, user.password);
    if (!DecryptedPassword) {
      res.status(400).json({ message: "Invalid password", success: false });
      return;
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1h" });

    res.cookie("token", token, { maxAge: 1000 * 60 * 60 });
    res.status(200).json({ data: token, success: true });
  } catch (error) {
    res.status(500).json({ message: error, success: false });
  }
};
