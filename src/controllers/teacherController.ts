import User, { IUser, IGrade } from "../models/userModel";
import Classroom, { IClassroom } from "../models/classroomModel";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose, { ObjectId } from "mongoose";

export const addGrade = async (req: Request, res: Response): Promise<void> => {
  try {
    const { classroom, studentId, grade, comment } = req.body;

    const token = req.cookies.token;
    const decoded = jwt.verify(token!, process.env.JWT_SECRET as string) as JwtPayload;

    const teacher = await User.findById(decoded.id);

    if (!teacher) {
      res.status(404).json({ message: "Teacher not found", success: false });
      return;
    }

    const classroomFound = await Classroom.findById(classroom);

    if (!classroomFound) {
      res.status(404).json({ message: "Classroom not found", success: false });
      return;
    }

    if (!teacher.classrooms.includes(classroomFound._id)) {
      res.status(400).json({ message: "You cannot add grades to this classroom", success: false });
      return;
    }
    const student = await User.findById(studentId);

    if (!student) {
      res.status(404).json({ message: "Student not found", success: false });
      return;
    }

    student.grades?.push({ _id: new mongoose.Types.ObjectId(), grade, comment });
    await student.save();

    res.status(200).json({ message: "Grade added successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error, success: false });
  }
};

export const getStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token!, process.env.JWT_SECRET as string) as JwtPayload;

    const teacher = await User.findById(decoded.id);

    const classroom = await Classroom.findById(teacher!.classrooms[0]);

    const details = await classroom?.students;

    res.status(200).json({ data: details, success: true });
  } catch (error) {
    res.status(500).json({ message: error, success: false });
  }
};

export const editGrade = async (req: Request, res: Response): Promise<void> => {
  try {
    const { studentName, gradeId, newGrade } = req.body;

    const student = await User.findOne({ username: studentName });

    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    const changeGrade = student.grades!.findIndex((g) => g._id.toString() === gradeId);

    if (changeGrade === -1) {
      res.status(404).json({ message: "Grade not found" });
      return;
    }

    student.grades![changeGrade!].grade = newGrade;

    await student.save();

    res.status(200).json({ message: "changed Grade", student });
  } catch (error) {
    res.status(500).json({ message: "Failed to change grade", error: error });
  }
};
