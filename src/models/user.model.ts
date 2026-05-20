import mongoose, { HydratedDocument, Model, Types } from "mongoose";
import { providerEnum } from "../common/enum/user.enum";
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
  user: object;
  provider: providerEnum;
  deletedAt: Date;
  role: string;
  _id: Types.ObjectId;
}
export const UserSchema = new mongoose.Schema<IUser>(
  {
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
      required: function (this: IUser) {
        return this.provider === providerEnum.system ? true : false;
      },
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
    provider: {},
  },
  {
    strictQuery: true,
  },
);
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
// UserSchema.pre(
//   "save",
//   async function (this: HydratedDocument<IUser> & { is_new: boolean }) {
//     console.log(this.isNew);
//     this.is_new = this.isNew;

//     if (this.isModified("password")) {
//       this.password = await hash(this.password, 12);
//       console.log(this);
//     }
//   },
// );
UserSchema.post("save", function () {
  const that = this as HydratedDocument<IUser> & { is_new: boolean };
  if (that.is_new) {
    //logic
  }
});
// el pre validate htsht8l abl el built in validation
UserSchema.post("findOne", function () {
  const { paranoid, ...rest } = this.getQuery();
  if (paranoid == false) {
    this.setQuery({ ...rest });
  } else {
    return { ...rest, deteledAt: { $exists: false } };
  }
});
const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
