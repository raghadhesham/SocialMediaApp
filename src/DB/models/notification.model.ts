import mongoose from "mongoose";
export interface INotfication {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  readAt: Date;
  content:string
}
const notifcationSchema = new mongoose.Schema<INotfication>(
  {
    content: {
      type: String,
      required: true,
    },
    readAt: {
      type: Date,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const NotificationModel = mongoose.model<INotfication>("Notification", notifcationSchema)
export default NotificationModel