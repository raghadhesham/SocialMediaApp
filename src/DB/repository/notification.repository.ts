import { Model } from "mongoose";
import { INotfication } from "../models/notification.model";
import BaseRepository from "./base.repository";

class NotificationRepository<INotfication> extends BaseRepository<INotfication>{
    constructor(protected readonly model:Model<INotfication>) {
        super(model)
    }
}
export default NotificationRepository