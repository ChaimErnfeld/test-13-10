import { Router } from "express";
import { registerTeacher, registerStudent, login } from "../controllers/auteController";

const auteRouter = Router();

/**
 * @swagger
 * /api/teachers/login:
 *   post:
 *     summary: login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Grade added successfully
 *       400:
 *         description: Cannot add grade to this classroom
 */
auteRouter.post("/login", login);

export default auteRouter;
