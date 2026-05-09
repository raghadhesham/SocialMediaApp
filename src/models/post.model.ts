import mongoose, { Types } from "mongoose";
import { AllowCommentsEnum, AvailabilityEnum } from "../common/enum/post.enum";

export interface IPost {
  content?: String;
  attachments?: String;
  mention?: Types.ObjectId;
  reactions?: Types.ObjectId;
  author: Types.ObjectId;
  availability: AvailabilityEnum;
  allowComment: AllowCommentsEnum;
}
const postSchema = new mongoose.Schema<IPost>({
  content: {
    type: String,
    min: 1,
        required: function (this) {
        return !this.attachments?.length
    },
  },
});

const PostModel = mongoose.model<IPost>("Post", postSchema)
export default PostModel