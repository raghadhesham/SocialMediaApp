import { Types } from "mongoose";
export type SignupRequest = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    DOB: Date;
    profilePicture: string;
    coverPicture: string;
};
export interface IUser {
    _id: Types.ObjectId;
    email: string;
    role: string;
    user: SignupRequest;
}
//# sourceMappingURL=auth.dto.d.ts.map