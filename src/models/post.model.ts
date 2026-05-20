import mongoose, { Types } from "mongoose";
import { AllowCommentsEnum, AvailabilityEnum } from "../common/enum/post.enum";

export interface IPost {
  content?: string;
  attachments?: string[];
  reactions?: Types.ObjectId;
  author: Types.ObjectId;
  availability: AvailabilityEnum;
  allowComment: AllowCommentsEnum;
  folderId?: Types.ObjectId;
}
const postSchema = new mongoose.Schema<IPost>({
  content: {
    type: String,
    min: 1,
        required: function (this) {
        return !this.attachments?.length
    },
  },
  attachments: {
    type: [String],
    default: [],
    required: function (this) {
      return !this.content
    },
  },
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  availability: {
    type: String,
    enum: AvailabilityEnum,
    default: AvailabilityEnum.public,
  },
  allowComment: {
    type: String,
    enum: AllowCommentsEnum,
    default: AllowCommentsEnum.allow,
  },
});

const PostModel = mongoose.model<IPost>("Post", postSchema)
export default PostModel