import { Router } from "express";
import { authenticate } from "../../common/middleware/authentication";
import multerCloud from "../../common/middleware/multer.cloud";
import { StoreEnum } from "../../common/enum/multer.enum";
import CommentService from "./comment.services";

const commentRouter = Router();
const commentService = new CommentService();

commentRouter.post(
  "/:postId/comments",
  authenticate,
  commentService.createComment,
);

commentRouter.post(
  "/:postId/comments/:commentId",
  authenticate,
  commentService.createComment,
);

commentRouter.get(
  "/:postId/comments",
  authenticate,
  commentService.getComments,
);

commentRouter.get(
  "/:postId/comments/:commentId",
  authenticate,
  commentService.getComments,
);

commentRouter.patch(
  "/:postId/comments/:commentId",
  authenticate,
  commentService.updateComment,
);

commentRouter.delete(
  "/:postId/comments/:commentId",
  authenticate,
  commentService.deleteComment,
);

export default commentRouter;
