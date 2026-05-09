import { Model } from "mongoose";
import BaseRepository from "./base.repository";
import UserModel from "../../models/user.model";
import { date } from "zod";
import { IUser } from "../../models/user.model";

class UserRepository<IUser> extends BaseRepository<IUser> {
  constructor(protected readonly model: Model<IUser>) {
    super(model);
  }
  async test() {
    await this.findOne({
      filter: { firstName: "ahmed" },
    });
  }
}
export default UserRepository;
