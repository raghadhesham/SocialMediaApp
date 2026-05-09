import { Types } from "mongoose"
import * as z from "zod"
export const generalRules = {
    id: z.string().refine((value) => {
        return Types.ObjectId.isValid(value)
    })
}