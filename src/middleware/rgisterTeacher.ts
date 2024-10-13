// import User, { IUser } from "../models/userModel";
import Classroom, { IClassroom } from "../models/classroomModel";
import { Request, Response, NextFunction } from "express";

export const examination = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const classroom = await Classroom.find({ name: req.body.classrooms });
    if (classroom.length > 0) {
      res.status(400).json({
        message: "You cannot join this class",
        success: false,
      });
      return;
    } else {
      const { classroom, userRequest } = req.body;

      const newClassroom = await Classroom.create(classroom);
      next(newClassroom);
    }
  } catch (error) {}
};
