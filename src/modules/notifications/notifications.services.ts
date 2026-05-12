import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import { config } from "../../config/config.services";
class NotificationService {
  private readonly _client: admin.app.App;
  constructor() {
    console.log("=== SERVICE ACCOUNT INFO ===");
    console.log("project_id:", config.firebase.projectId);
    console.log("client_email:", config.firebase.clientEmail);
    console.log("============================");
    this._client = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: config.firebase.projectId!,
        clientEmail: config.firebase.clientEmail!,
        privateKey: config.firebase.privateKey!,
      }),
      projectId: config.firebase.projectId!,
    });
  }

  async sendNotification({
    token,
    notification,
  }: {
    token: string;
    notification: {
      title: string;
      body: string;
    };
  }) {
    const message = {
      token,
      notification,
    };

    return await this._client.messaging().send(message);
  }
}
export default new NotificationService();
