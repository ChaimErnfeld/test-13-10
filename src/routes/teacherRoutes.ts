import { Router } from "express";
import { addGrade, getStudents, editGrade } from "../controllers/teacherController";
import { isTeacher } from "../middleware/isTeacher";

const teacherRouter = Router();

teacherRouter.post("/grade", isTeacher, addGrade);
teacherRouter.get("/", getStudents);
teacherRouter.put("/grade", editGrade);

export default teacherRouter;
