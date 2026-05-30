import { Request } from "express";
import { AvailabilityEnum } from "../enum/post.enum";

export const PostAvailability = (req: Request) => {
  return [
    { availability: AvailabilityEnum.public },
    { availability: AvailabilityEnum.only_me, author: req.user?._id! },
    //   { availability: AvailabilityEnum.friends, {$in:[(...req.user._id)]}},
  ];
};
