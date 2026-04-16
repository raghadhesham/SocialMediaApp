import { Model } from "mongoose";
import BaseRepository from "./base.repository";
declare class UserRepository<IUser> extends BaseRepository<IUser> {
    protected readonly model: Model<IUser>;
    constructor(model: Model<IUser>);
}
export default UserRepository;
//# sourceMappingURL=user.repository.d.ts.map