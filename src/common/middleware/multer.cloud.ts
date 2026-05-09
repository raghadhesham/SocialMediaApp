import multer from "multer";
import { MulterEnum, StoreEnum } from "../enum/multer.enum";
import { tmpdir } from "node:os";
import { Request, Response } from "express";

const multerCloud = ({
  store_types = StoreEnum.memory,
  custom_types = [MulterEnum.image, MulterEnum.video, MulterEnum.pdf].flat(),
  maxFileSize = 500 * 1024 * 1024,
}: {
  store_types?: StoreEnum;
  custom_types?: string[];
  maxFileSize?: number;
} = {}) => {
  try {
    const storage =
      store_types === StoreEnum.memory
        ? multer.memoryStorage()
        : multer.diskStorage({
            destination: (req: Request, file: Express.Multer.File, cb) =>
              cb(null, tmpdir()),
            filename: function (
              req: Request,
              file: Express.Multer.File,
              cb: Function,
            ) {
              const uniqueSuffix =
                Date.now() + "-" + Math.round(Math.random() * 1e9);
              cb(null, file.fieldname + "-" + uniqueSuffix);
              console.log(file.fieldname + "-" + uniqueSuffix);
            },
          });
    function fileFilter(req: Request, file: Express.Multer.File, cb: Function) {
      if (!custom_types.includes(file.mimetype)) {
        console.log(file.mimetype);

        return cb(new Error("Invalid file type"), false);
      } else {
        cb(null, true);
      }
    }

    const upload = multer({
      storage,
      fileFilter,
      limits: { fileSize: maxFileSize },
    });
    console.log(upload);
    return upload;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export default multerCloud;
