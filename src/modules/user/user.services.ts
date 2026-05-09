import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextFunction, Request, Response } from "express";
import { config } from "../../config/config.services";
import { S3Service } from "../../common/services/s3.services";
import { StoreEnum } from "../../common/enum/multer.enum";
class UserService {
  s3Service = new S3Service();
  constructor() {}
  uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    const key = await this.s3Service.uploadFile({
      file: req.file!,
      path: "profilePics",
      storage: StoreEnum.memory,
      // ACL: "public-read"
    });
    console.log(key);
    console.log(req.file);
    res.status(200).json({ message: "file uploaded", data: key });
  };
  uploadLargeFile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const key = await this.s3Service.uploadLargeFile({
      file: req.file!,
      path: "videos",
      storage: StoreEnum.disk,
      // ACL: "public-read"
    });
    console.log(key);
    console.log(req.file);
    res.status(200).json({ message: "file uploaded", data: key });
  };
}

export default UserService;
