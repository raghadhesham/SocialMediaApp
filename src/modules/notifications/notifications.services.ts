import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import { readFileSync } from "fs";
import { resolve } from "path";
class NotificationService {
  private readonly _client: admin.app.App;
  constructor() {

    const service=JSON.parse(readFileSync(resolve(__dirname, "../../config/social-media-app-cf98b-firebase-adminsdk-fbsvc-00d81959a0.json"), "utf-8")) as any
    this._client = admin.initializeApp({
      credential: admin.credential.cert(
        service
      ),
    });
  }

  async sendNotification({
    token,
    data,
  }: {
    token: string;
    data: {
      title: string;
      body: string;
    }; 
  }) {
    const message = {
      token,
      data,
    };

    return await this._client.messaging().send(message);
  }
}
export default new NotificationService();
