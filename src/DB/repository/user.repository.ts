import { Model } from "mongoose";
import { IUser } from "../../auth.dto";
import BaseRepository from "./base.repository";
import UserModel from "../../models/user.model";
import { date } from "zod";

class UserRepository<IUser> extends BaseRepository<IUser>{
    constructor(protected readonly model: Model<IUser>) {
        super(model)
    } 
    
}
export default UserRepository