import { NextFunction, Request, Response } from "express";
import PostRepository from "../../DB/repository/post.repository";
import PostModel, { IPost } from "../../DB/models/post.model";
import { AllowCommentsEnum } from "../../common/enum/post.enum";
import { AppError } from "../../common/utils/response/global-error-handler";
import UserRepository from "../../DB/repository/user.repository";
import UserModel from "../../DB/models/user.model";
import { ModelEnum } from "../../common/enum/model.enum";
import commentModel, { IComment } from "../../DB/models/comment.model";
import CommentRepository from "../../DB/repository/comment.repository";
import { HydratedDocument, Types } from "mongoose";
import { PostAvailability } from "../../common/utils/post.utils";

class CommentService {
  private _postRepo = new PostRepository(PostModel);
  private _userRepo = new UserRepository(UserModel);
  private _commentRepo = new CommentRepository(commentModel);
  constructor() {}
  createComment = async (req: Request, res: Response, next: NextFunction) => {
    const { content, tags, onModel } = req.body;
    const { postId, commentId } = req.params;
    if (onModel === ModelEnum.comment && !commentId) {
      throw new AppError("Comment ID is required for replies", 400);
    }
    if (onModel == ModelEnum.comment && commentId) {
      const parentComment = await this._commentRepo.findOne({
        filter: {
          _id: commentId,
          refId: postId!,
        },
        projection: {
          projection: [
            {
              path: "refId",
              match: {
                _id: postId,
                allowComment: AllowCommentsEnum.allow,
              },
            },
          ],
        },
      });
      if (!parentComment || !parentComment?.refId) {
        throw new Error(
          "Comment not allowed or you are not allowed to comment or post not found",
        );
      }
    } else {
      const post = await this._postRepo.findOne({
        filter: {
          _id: postId,
          allowComment: AllowCommentsEnum.allow,
          $or: PostAvailability(req),
        },
      });

      if (!post) {
        throw new AppError("Post not found or comments disabled", 404);
      }
    }
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
    const comment = await this._commentRepo.create({
      content,
      author: new Types.ObjectId(req.userId),
      refId: new Types.ObjectId(
        onModel === ModelEnum.comment
          ? (commentId as string)
          : (postId! as string),
      ),
      onModel,
    });
    res.status(201).json({ message: "Comment created successfully", comment });
  };

  getComments = async (req: Request, res: Response, next: NextFunction) => {
    const { postId, commentId } = req.params;

    const post = await this._postRepo.findOne({
      filter: { _id: postId, $or: PostAvailability(req) },
    });
    if (!post) {
      throw new AppError("Post not found", 404);
    }

    const filter = commentId
      ? { refId: commentId!, onModel: ModelEnum.comment }
      : { refId: postId!, onModel: ModelEnum.post };

    const comments = await this._commentRepo.find({ filter });
    res
      .status(200)
      .json({ message: "Comments fetched successfully", comments });
  };

  updateComment = async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await this._commentRepo.findOneAndUpdate({
      filter: { _id: commentId!, author: req.userId! },
      update: { content },
      options: { new: true },
    });
    if (!comment) {
      throw new AppError("Comment not found or you are not authorized", 404);
    }

    res.status(200).json({ message: "Comment updated successfully", comment });
  };

  deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;

    const comment = await this._commentRepo.findOne({
      filter: { _id: commentId!, author: req.userId! },
    });
    if (!comment) {
      throw new AppError("Comment not found or you are not authorized", 404);
    }

    await this._commentRepo.findByIdAndDelete({ id: comment._id, options: {} });
    // cascade delete all replies to this comment
    await commentModel.deleteMany({
      refId: commentId!,
      onModel: ModelEnum.comment,
    });

    res.status(200).json({ message: "Comment deleted successfully" });
  };
}
export default CommentService;
