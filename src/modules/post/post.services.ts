import { NextFunction, Request, Response } from "express";
import PostModel from "../../DB/models/post.model";
import PostRepository from "../../DB/repository/post.repository";
import { S3Service } from "../../common/services/s3.services";
import UserRepository from "../../DB/repository/user.repository";
import UserModel from "../../DB/models/user.model";
import { StoreEnum } from "../../common/enum/multer.enum";

class PostService {
  private readonly _postRepository = new PostRepository(PostModel);
  private readonly _userRepository = new UserRepository(UserModel);
  private _s3Service = new S3Service();
  constructor() {}
  createPost = async (req: Request, res: Response, next: NextFunction) => {
    let { content, availability, allowComment } = req.body;
    const author = await this._userRepository.findById({
      _id: req.userId!,
    });
    let urls: string[] = [];
    console.log(req.files);

    if (req?.files) {
      urls = await this._s3Service.uploadFiles({
        path: "files",
        files: req.files as Express.Multer.File[],
        storage: StoreEnum.memory,
      });
    }
    const post = await this._postRepository.create({
      content,
      availability,
      allowComment,
      author: author!._id,
      attachments: urls,
    });
    await post.save();
    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  };
}

export default new PostService();
