import {
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { config } from "../../config/config.services";
import { randomUUID } from "node:crypto";
import { StoreEnum } from "../enum/multer.enum";
import { createReadStream } from "node:fs";
import { Upload } from "@aws-sdk/lib-storage";
export class S3Service {
  private _client: S3Client;
  constructor() {
    this._client = new S3Client({
      region: config.aws.S3_REGION!,
      credentials: {
        accessKeyId: config.aws.AWS_ACCESS_KEY_ID!,
        secretAccessKey: config.aws.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }
  // m3ndeesh api fe aws btrf3 aktr mn file
  async uploadFile({
    file,
    storage,
    path = "General",
    ACL,
  }: {
    file: Express.Multer.File;
    storage?: StoreEnum;
    path?: string;
    ACL?: ObjectCannedACL;
  }) {
    const command = new PutObjectCommand({
      Bucket: config.aws.S3_BUCKET_NAME,
      ACL,
      Key: `social_media_app/${path}/${randomUUID()}__${file.originalname}`,
      Body:
        storage === StoreEnum.memory
          ? file.buffer
          : createReadStream(file.path),
      ContentType: file.mimetype,
    });
    console.log(command);
    
    if (!command.input.Key) {
      throw new Error("Failed to upload file :(");
    }
    await this._client.send(command);
    return command.input.Key;
  }
  async uploadLargeFile({file,
    storage,
    path = "General",
    ACL,
  }: {
    file: Express.Multer.File;
    storage?: StoreEnum;
    path?: string;
    ACL?: ObjectCannedACL;
  }) { // law a2l mn 5GB msh htrda trf3holk
    // for larger files more than 5GB
    const upload = new Upload({
      client: this._client,
      params: {
        Bucket: config.aws.S3_BUCKET_NAME!,
        Key: `social_media_app/${path}/${randomUUID()}__large_file.txt`,
        Body: createReadStream(file.path),
      },
    })
    upload.on("httpUploadProgress", (progress) => {
    console.log(`File upload progress is ::: `, progress);
  });
  return await upload.done();

    // res.status(200).json({ message: "Large File uploaded",data:result.Key });
  }
}
