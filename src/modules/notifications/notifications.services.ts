import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { config } from "../../config/config.services";
class NotificationService {
  private readonly _client: admin.app.App;
  constructor() {
    const serviceAccount = JSON.parse(
      readFileSync(config.firebase.jsonPath!, "utf-8"),
    );
    console.log("=== SERVICE ACCOUNT INFO ===");
    console.log("project_id:", serviceAccount.project_id);
    console.log("client_email:", serviceAccount.client_email);
    console.log("============================");
    this._client = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
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
