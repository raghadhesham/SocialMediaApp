import express, { Application, NextFunction, Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
const app: Application = express();
import cors from "cors";
import { config } from "./config/config.services";
import {
  AppError,
  globalErrorHandler,
} from "./common/utils/response/global-error-handler";
import { checkConnectionDb } from "./DB/connectionDB";
import { authRouter } from "./modules/auth/auth.controllers";
import redisServices from "./common/services/redis.services";
import UserRepository from "./DB/repository/user.repository";
import UserModel from "./models/user.model";
import userRouter from "./modules/user/user.controllers";
import notificationsServices from "./modules/notifications/notifications.services";
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  legacyHeaders: false,
  handler: (req: Request, res: Response, next: Function) => {
    throw new AppError(
      `Too many requests from this IP, please try again after 15 minutes!`,
      429,
    );
  },
});
const bootstrap = async () => {
  const _userRepo = new UserRepository(UserModel);
  _userRepo.test();
  await checkConnectionDb();
  redisServices.connect();
  app.use(express.json(), cors());
  app.use(helmet());
  // app.use(limiter);
  app.post(
    "/send-notification",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await notificationsServices.sendNotification({
          token: req.body.token,
          notification: { 
            title: "Hello World",
            body: "This is a test notification",
          },
        });
        console.log(req.body.token);
        res.status(200).json({ message: "Notification sent" });
      } catch (error) {
        next(error);
      }
    },
  );
  app.use("/user", userRouter);
  app.use("/auth", authRouter);
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Hi! Welcome to our app!" });
  });
  app.use("{/*demo}", (req: Request, res: Response) => {
    throw new AppError(
      `Url ${req.originalUrl} with method ${req.method} not found!`,
      404,
    );
  });
  app.use(globalErrorHandler);
  app.listen(config.PORT, () => {
    console.log(`Server is running on PORT ${config.PORT}`);
  });
};
export default bootstrap;
