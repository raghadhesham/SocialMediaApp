import { Router, NextFunction, Response, Request } from "express";
import postServices from "./post.services";
import { authenticate } from "../../common/middleware/authentication";
import multerCloud from "../../common/middleware/multer.cloud";
import { StoreEnum } from "../../common/enum/multer.enum";
const postRouter = Router();
postRouter.post(
  "/",
  authenticate,
  multerCloud({ store_types: StoreEnum.memory }).array("files", 5),
  postServices.createPost,
);
export default postRouter;
