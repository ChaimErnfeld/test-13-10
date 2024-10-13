import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface IClassroom extends Document {
  _id: Types.ObjectId;
  name: string;
  teacher: string;
  students: string[];
}

const ClassroomSchema = new Schema({
  name: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: "User" },
  students: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export const Classroom = mongoose.model<IClassroom>("Classroom", ClassroomSchema);
