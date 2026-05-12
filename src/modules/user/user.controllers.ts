import { NextFunction, Request, Response, Router } from "express";
import UserService from "./user.services";
import multerCloud from "../../common/middleware/multer.cloud";
import { StoreEnum } from "../../common/enum/multer.enum";

const userRouter = Router();
const userService = new UserService();
userRouter.post("/upload-image",multerCloud({store_types: StoreEnum.memory}).single("image"), userService.uploadImage);
userRouter.post("/upload-large-file",multerCloud({store_types: StoreEnum.disk}).single("video"), userService.uploadLargeFile);
userRouter.put("/create-presigned-url",userService.createPreSigenedUrl)
export default userRouter;
 