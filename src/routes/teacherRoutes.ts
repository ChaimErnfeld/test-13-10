import { Router } from "express";
import { addGrade } from "../controllers/teacherController";
import { isTeacher } from "../middleware/isTeacher";

const teacherRouter = Router();

teacherRouter.post("/addGrade", isTeacher, addGrade);

export default teacherRouter;
