import { Router } from "express";
import { registerTeacher, registerStudent, login } from "../controllers/auteController";

const auteRouter = Router();

auteRouter.post("/registerTeacher", registerTeacher);
auteRouter.post("/registerStudent", registerStudent);
auteRouter.post("/login", login);

export default auteRouter;
