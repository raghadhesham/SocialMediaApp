import * as z from "zod";
import {
  AllowCommentsEnum,
  AvailabilityEnum,
} from "../../common/enum/post.enum";
export const createPostSchema = {
  body: z
    .strictObject({
      content: z.string().optional(),
      attachments: z.string().optional(),
      allowComment: z.enum(AllowCommentsEnum).default(AllowCommentsEnum.allow),
      availability: z.enum(AvailabilityEnum).default(AvailabilityEnum.friends),
      // tags:z.array()
    })
    .superRefine((args, ctx) => {
      if (!args.content && !args.attachments?.length) {
        ctx.addIssue({
          code: "custom",
          path: ["content"],
          message: "content is required",
        });
        }
        // if (args?.tags?.length) {
            
        // }
    }),
};
