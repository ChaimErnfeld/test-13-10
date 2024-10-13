import { Router } from "express";
import { addGrade, getStudents } from "../controllers/teacherController";
import { isTeacher } from "../middleware/isTeacher";

const teacherRouter = Router();

teacherRouter.post("/addGrade", isTeacher, addGrade);
teacherRouter.get("/", getStudents);

export default teacherRouter;
