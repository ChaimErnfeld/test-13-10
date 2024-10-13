import { kMaxLength } from "buffer";
import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  grades?: Types.ObjectId[];
  role: string;
}

export interface IGrade extends Document {
  _id: Types.ObjectId;
  grade: number;
  comment: string;
}

const gradeSchema = new Schema<IGrade>({
  grade: {
    type: Number,
    required: [true, "Please enter a grade"],
    trim: true,
  },
  comment: {
    type: String,
    required: [true, "Please enter a comment"],
    trim: true,
  },
});

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    minlength: [3, "Username must be at least 3 chars long"],
    maxlength: [30, "Username cannot exceed 30 chars!"],
    match: [/^[a-zA-Z0-9]+$/, "Username can only contain letters, numbers"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: validator.isEmail,
  },
  grades: [gradeSchema],
  role: {
    type: String,
    required: [true, "Please enter a username"],
    enum: ["student", "teacher"],
  },
});

export default mongoose.model<IUser>("User", UserSchema);
