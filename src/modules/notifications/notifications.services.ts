import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import { readFileSync } from "fs";
import mongoose from "mongoose";
import { resolve } from "path";
import NotificationRepository from "../../DB/repository/notification.repository";
import NotificationModel from "../../DB/models/notification.model";
class NotificationService {
  private readonly _client: admin.app.App;
  constructor() {
    const service = JSON.parse(
      readFileSync(
        resolve(
          __dirname,
          "../../config/social-media-app-cf98b-firebase-adminsdk-fbsvc-00d81959a0.json",
        ),
        "utf-8",
      ),
    ) as any;
    this._client = admin.initializeApp({
      credential: admin.credential.cert(service),
    });
  }

  async sendNotification({
    token,
    data,
    recieverId,
  }: {
    token: string;
    data: {
      title: string;
      body: string;
    };
    recieverId: mongoose.Types.ObjectId;
  }) {
    const content = {
      token,
      data,
    };
    return await this._client.messaging().send(content);
  }
  async readNotifications({ _id }: { _id: mongoose.Types.ObjectId }) {
    const _notificationRepo = new NotificationRepository(NotificationModel);
    await _notificationRepo.updateOne({
      filter: { userId: _id },
      update: { $set: { readAt: new Date() } },
    });
  }
  
}
export default new NotificationService();
