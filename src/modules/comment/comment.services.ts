import { NextFunction, Request, Response } from "express";
import PostRepository from "../../DB/repository/post.repository";
import PostModel, { IPost } from "../../models/post.model";
import { AllowCommentsEnum } from "../../common/enum/post.enum";
import { AppError } from "../../common/utils/response/global-error-handler";
import UserRepository from "../../DB/repository/user.repository";
import UserModel from "../../models/user.model";
import { ModelEnum } from "../../common/enum/model.enum";
import commentModel, { IComment } from "../../models/comment.model";
import CommentRepository from "../../DB/repository/comment.repository";
import { HydratedDocument } from "mongoose";
import { PostAvailability } from "../../common/utils/post.utils";

class CommentService {
  private _postRepo = new PostRepository(PostModel);
  private _userRepo = new UserRepository(UserModel);
  private _commentRepo = new CommentRepository(commentModel);
  constructor() {}
  creatComment = async (req: Request, res: Response, next: NextFunction) => {
    const { content, tags, onModel } = req.body;
    const { postId, commentId } = req.params;
    let doc: HydratedDocument<IComment | IPost> | null = null;
    if (onModel == ModelEnum.comment && commentId) {
      const comment = await this._commentRepo.findOne({
        filter: {
          _id: commentId,
          ref: postId,
        },
        projection: {
          populate: [
            {
              path: "refId",
              match: {
                _id: postId,
                allowComment: AllowCommentsEnum,
              },
            },
          ],
        },
      });
      if (!comment?.refId) {
        throw new Error(
          "Comment not allowed or you are not allowed to comment",
        );
      }
      doc = comment;
    } else if (onModel == ModelEnum.post && !commentId) {
      const post = await this._postRepo.findOne({
        filter: {
          _id: postId!,
          $or: PostAvailability(req),
          allowComment: AllowCommentsEnum.allow,
        },
      });
    }

    const post = await this._postRepo.findOne({
      filter: {
        _id: postId,
        allowComment: AllowCommentsEnum.allow,
      },
    });
    if (!post) {
      throw new AppError("Post Not found", 404);
    }
    //   let mentions : Types.ObjectId[] = {}
    //     let FCMTokens: string[]={}
    if (tags?.length) {
      const data = await this._userRepo.find({
        filter: {
          _id: { $in: tags },
        },
      });
      if (data.length !== tags.length) {
        throw new Error("some tag id not found");
      }
    }
  };
}
export default CommentService;
