import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  projectName: string;
  createdBy: string;
  dueDate: Date;
  description: string;
  status: string;
}

const ProjectSchema: Schema = new Schema(
  {
    projectName: { type: String, required: true },
    createdBy: { type: String, required: true },
    dueDate: { type: Date, required: true },
    description: { type: String },
    status: { type: String, default: "incomplete" },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
