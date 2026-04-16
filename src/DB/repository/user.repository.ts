import { Model } from "mongoose";
import { IUser } from "../../auth.dto";
import BaseRepository from "./base.repository";

class UserRepository<IUser> extends BaseRepository<IUser>{
    constructor(protected readonly model: Model<IUser>) {
        super(model)
    }
    
}
export default UserRepository