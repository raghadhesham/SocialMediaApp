import { Router, Request, Response, NextFunction } from "express";
import notificationsServices from "./notifications.services";
import NotificationRepository from "../../DB/repository/notification.repository";
import NotificationModel from "../../DB/models/notification.model";
export const notificationRouter = Router();
notificationRouter.post(
  "/send-notification",
  async (req: Request, res: Response, next: NextFunction) => {
    const _notificationRepo = new NotificationRepository(NotificationModel);
    const recieverId = req.body.recieverId;
    const data = {
      title: "Hello World",
      body: "This is a test notification",
    };
    await notificationsServices.sendNotification({
      token: req.body.token,
      recieverId,
      data,
    });
    await _notificationRepo.create({
      _id: recieverId,
      content: data.body,
    });
    res.status(200).json({ message: "Notification sent successfully!" });
  },
);
notificationRouter.patch(
  "/read-notifications",
  async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.userId!;
    await notificationsServices.readNotifications({ _id });
    res.status(200).json({ message: "Notifications read successfully!" });
  },
);
