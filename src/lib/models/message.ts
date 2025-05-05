import mongoose, { Schema, Document, models } from 'mongoose';

export interface IMessage extends Document {
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: Date;
  seen: boolean;
}

const MessageSchema: Schema<IMessage> = new Schema(
  {
    senderId: { type: String, required: true },
    recipientId: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    seen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Message || mongoose.model<IMessage>('Message', MessageSchema);
