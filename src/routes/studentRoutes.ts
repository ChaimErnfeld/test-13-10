import { Router } from "express";
import { registerStudent } from "../controllers/auteController";

const studentRouter = Router();

/**
 * @swagger
 * /api/teachers/registerStudent:
 *   post:
 *     summary: Register a student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               classroom:
 *                 type: string
 *     responses:
 *       200:
 *         description: Grade added successfully
 *       400:
 *         description: Cannot add grade to this classroom
 */
studentRouter.post("/register", registerStudent);

export default studentRouter;
