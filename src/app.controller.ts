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
import { checkConnectionDb } from "./DB/mongoDB/connectionDB";
import { authRouter } from "./modules/auth/auth.controllers";
import redisServices from "./common/services/redis.services";
import UserRepository from "./DB/repository/user.repository";
import UserModel from "./DB/models/user.model";
import userRouter from "./modules/user/user.controllers";
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import postRouter from "./modules/post/post.controllers";
import commentRouter from "./modules/comment/comment.controllers";
import { notificationRouter } from "./modules/notifications/notifications.controllers";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
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
  app.use(limiter);
  let queryObject = new GraphQLObjectType({
    name: "getUser",
    fields: {
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      age: { type: GraphQLString },
      email: { type: GraphQLString },
    },
  });
  const users = [
    { id: 1, name: "Raghad", age: 25, email: "raghad@example.com" },
    { id: 2, name: "Ahmad", age: 30, email: "ahmad@example.com" },
    { id: 3, name: "Sara", age: 28, email: "sara@example.com" },
  ];
  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      // GraphQLObjectType:name fields description
      name: "query", // unique, alphanumeric, doesn't have spaces, can't start with a number
      fields: {
        // object, bemathabet apis
        users: {
          // get 3la slash hello
          type: queryObject, // type el data elly ray7a
          description: "A simple hello world query",
          args: {
            id: {
              // a graphql id is meant to be a unique identifier, not something that is human-readable.
              type: GraphQLString,
            },
          },
          resolve: (parent, args): object => {
            return users.find((user) => args.id == user.id)!; // logic el code
          },
        },
        listUsers: {
          type: new GraphQLList(queryObject),

          description: "A simple list users query",
          resolve: (): object[] => {
            return users; // logic el code
          },
        },
      },
      description: "The root query type.",
    }),
  });
  app.use("/", notificationRouter);
  app.use("/graphql", createHandler({ schema }));
  app.use("/user", userRouter);
  app.use("/posts", postRouter);
  app.use("/posts", commentRouter);
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
