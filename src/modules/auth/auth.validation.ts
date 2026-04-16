import * as z from "zod";
export const signUpSchema = {
    body: z.object({
        userName: z.string({ message: "Username must be between 3 and 20 characters" }).min(3).max(20),
        email: z.email({ message: "Please provide a valid email address" }),
        password: z.string({ message: "Password must be at least 8 characters long" }).min(8),
        confirmPassword: z.string({ message: "Confirm password must be at least 8 characters long" }).min(8),
    }).superRefine((data, ctx) => {
        if (data.password!==data.confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Passwords don't match",
                path: ["confirmPassword"],
            })
        }
    })
}
