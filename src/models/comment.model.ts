import mongoose, { Types } from "mongoose";
import { ModelEnum } from "../common/enum/model.enum";

export interface IComment {
  content?: String;
  attachments?: String;
  mention?: Types.ObjectId;
  reactions?: Types.ObjectId;
  author: Types.ObjectId;
  folderId?: Types.ObjectId;
  refId: Types.ObjectId;
  onModel: ModelEnum;
}
const CommentSchema = new mongoose.Schema<IComment>({
  content: {
    type: String,
    min: 1,
    required: function (this) {
      return !this.attachments?.length;
    },
  },
  attachments: {
    type: [String],
    required: function (this) {
      return !this.content;
    },
  },
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  mention: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  reactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  refId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "onModel",
    required: true,
  },
  onModel: {
    type: String,
    required: true,
  },
});
CommentSchema.virtual("replies", {
  "ref": "Comment",
  localField: "_id",
  foreignField:"refId"
})
const commentModel = mongoose.model<IComment>("Comment", CommentSchema);
export default commentModel;
