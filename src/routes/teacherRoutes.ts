import { Router } from "express";
import { addGrade, getStudents, editGrade } from "../controllers/teacherController";
import { isTeacher } from "../middleware/isTeacher";

const teacherRouter = Router();
/**
 * @swagger
 * /api/teachers/grades:
 *   post:
 *     summary: Add a grade
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               classroom:
 *                 type: string
 *               studentId:
 *                 type: string
 *               grade:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Grade added successfully
 *       400:
 *         description: Cannot add grade to this classroom
 */
teacherRouter.post("/grade", isTeacher, addGrade);

/**
 * @swagger
 * /api/teachers//:
 *   get:
 *     summary: Get students
 *     responses:
 *       200:
 *         description: List of students
 */
teacherRouter.get("/", getStudents);

/**
 * @swagger
 * /api/teachers//grade:
 *   put:
 *     summary: Edit a grade
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentName:
 *                 type: string
 *               gradeId:
 *                 type: string
 *               newGrade:
 *                 type: number
 *     responses:
 *       200:
 *         description: Grade changed successfully
 *       404:
 *         description: Student or Grade not found
 */
teacherRouter.put("/grade", editGrade);

export default teacherRouter;
