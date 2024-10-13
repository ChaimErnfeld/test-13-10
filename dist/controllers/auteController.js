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
exports.login = exports.registerStudent = exports.registerTeacher = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const classroomModel_1 = __importDefault(require("../models/classroomModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, classroom } = req.body;
        const result = yield examination(classroom);
        if (result) {
            res.status(400).json({
                message: "You cannot join this class",
                success: false,
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield userModel_1.default.create({
            username,
            email,
            password: hashedPassword,
            classrooms: [],
            role: "teacher",
        });
        const newClassroom = yield classroomModel_1.default.create({
            name: classroom,
            teacher: user._id,
        });
        user.classrooms.push(newClassroom._id);
        yield user.save();
        res.status(200).json({ classId: user.classrooms, success: true });
    }
    catch (error) {
        res.status(400).json({ message: error, success: false });
    }
});
exports.registerTeacher = registerTeacher;
const examination = (className) => __awaiter(void 0, void 0, void 0, function* () {
    const classroom = yield classroomModel_1.default.find({ name: className });
    if (classroom.length > 0) {
        return true;
    }
    else {
        return false;
    }
});
const registerStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, classroom } = req.body;
        const result = yield classroomModel_1.default.findOne({ name: classroom });
        if (result === null) {
            res.status(404).json({
                message: "Class not found",
                success: false,
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield userModel_1.default.create({
            username: username,
            email: email,
            password: hashedPassword,
            role: "student",
        });
        user.classrooms.push(result._id);
        yield user.save();
        result.students.push(user._id.toString());
        yield result.save();
        res.status(200).json({ data: user, success: true });
    }
    catch (error) {
        res.status(500).json({ message: error, success: false });
    }
});
exports.registerStudent = registerStudent;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email: email });
        if (!user) {
            res.status(404).json({ message: "User not found", success: false });
            return;
        }
        const DecryptedPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!DecryptedPassword) {
            res.status(400).json({ message: "Invalid password", success: false });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { maxAge: 1000 * 60 * 60 });
        res.status(200).json({ data: token, success: true });
    }
    catch (error) {
        res.status(500).json({ message: error, success: false });
    }
});
exports.login = login;
