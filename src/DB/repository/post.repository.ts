import { Model } from "mongoose";
import { IPost } from "../models/post.model";
import BaseRepository from "./base.repository";
class PostRepository<IPost> extends BaseRepository<IPost> {
  constructor(protected readonly model: Model<IPost>) {
    super(model);
  }
}
export default PostRepository;
