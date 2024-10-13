"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teacherController_1 = require("../controllers/teacherController");
const isTeacher_1 = require("../middleware/isTeacher");
const teacherRouter = (0, express_1.Router)();
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
teacherRouter.post("/grade", isTeacher_1.isTeacher, teacherController_1.addGrade);
/**
 * @swagger
 * /api/teachers//:
 *   get:
 *     summary: Get students
 *     responses:
 *       200:
 *         description: List of students
 */
teacherRouter.get("/", teacherController_1.getStudents);
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
teacherRouter.put("/grade", teacherController_1.editGrade);
exports.default = teacherRouter;
