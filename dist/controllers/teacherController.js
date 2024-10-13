"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editGrade = exports.getStudents = exports.addGrade = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const classroomModel_1 = __importDefault(require("../models/classroomModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const addGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { classroom, studentId, grade, comment } = req.body;
        const token = req.cookies.token;
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const teacher = yield userModel_1.default.findById(decoded.id);
        if (!teacher) {
            res.status(404).json({ message: "Teacher not found", success: false });
            return;
        }
        const classroomFound = yield classroomModel_1.default.findById(classroom);
        if (!classroomFound) {
            res.status(404).json({ message: "Classroom not found", success: false });
            return;
        }
        if (!teacher.classrooms.includes(classroomFound._id)) {
            res.status(400).json({ message: "You cannot add grades to this classroom", success: false });
            return;
        }
        const student = yield userModel_1.default.findById(studentId);
        if (!student) {
            res.status(404).json({ message: "Student not found", success: false });
            return;
        }
        (_a = student.grades) === null || _a === void 0 ? void 0 : _a.push({ _id: new mongoose_1.default.Types.ObjectId(), grade, comment });
        yield student.save();
        res.status(200).json({ message: "Grade added successfully", success: true });
    }
    catch (error) {
        res.status(500).json({ message: error, success: false });
    }
});
exports.addGrade = addGrade;
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const teacher = yield userModel_1.default.findById(decoded.id);
        const classroom = yield classroomModel_1.default.findById(teacher.classrooms[0]);
        const details = yield (classroom === null || classroom === void 0 ? void 0 : classroom.students);
        res.status(200).json({ data: details, success: true });
    }
    catch (error) {
        res.status(500).json({ message: error, success: false });
    }
});
exports.getStudents = getStudents;
const editGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentName, gradeId, newGrade } = req.body;
        const student = yield userModel_1.default.findOne({ username: studentName });
        if (!student) {
            res.status(404).json({ message: "Student not found" });
            return;
        }
        const changeGrade = student.grades.findIndex((g) => g._id.toString() === gradeId);
        if (changeGrade === -1) {
            res.status(404).json({ message: "Grade not found" });
            return;
        }
        student.grades[changeGrade].grade = newGrade;
        yield student.save();
        res.status(200).json({ message: "changed Grade", student });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to change grade", error: error });
    }
});
exports.editGrade = editGrade;
