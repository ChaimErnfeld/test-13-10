"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auteController_1 = require("../controllers/auteController");
const auteRouter = (0, express_1.Router)();
/**
 * @swagger
 * /api/teachers/registerTeacher:
 *   post:
 *     summary: Register a teacher
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
auteRouter.post("/registerTeacher", auteController_1.registerTeacher);
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
auteRouter.post("/registerStudent", auteController_1.registerStudent);
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
auteRouter.post("/login", auteController_1.login);
exports.default = auteRouter;
