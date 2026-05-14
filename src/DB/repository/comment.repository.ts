import { Model } from "mongoose";
import { IComment } from "../../models/comment.model";
import BaseRepository from "./base.repository";
class CommentRepository<IComment> extends BaseRepository<IComment> {
  constructor(protected readonly model: Model<IComment>) {
    super(model);
  }
}
export default CommentRepository;
