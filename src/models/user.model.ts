import mongoose, { Model, Types } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  password: string;
  gender: string;
  DOB: Date;
  profilePicture: string;
  coverPicture: string;
  followers: Types.ObjectId[];
  followings: Types.ObjectId[];
  isConfirmed: boolean;
  user:object
}
export const UserSchema = new mongoose.Schema<IUser>({
  firstName: {
    type: String,
    min: 3,
    required: true,
  },
  lastName: {
    type: String,
    min: 3,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  coverPicture: {
    type: String,
    default: "",
  },
  followers: {
    type: [Types.ObjectId],
    default: [],
  },
  followings: {
    type: [Types.ObjectId],
    default: [],
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
});
UserSchema.virtual("userName")
  .get(function () {
    return this.firstName + " " + this.lastName;
  })
  .set(function (value: string) {
    this.set({
      firstName: value.split(" ")[0],
      lastName: value.split(" ")[1],
    });
  });
const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
