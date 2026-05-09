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

