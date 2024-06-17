import z from 'zod'

export const signInSchema = z.object({
    email:z.string().email(),
    password: z.string().min(6)
});
export const signUpSchema = z.object({
    email:z.string().email(),
    name: z.string().optional(),
    password: z.string().min(6)
});
export const postBlogSchema = z.object({
    title: z.string(),
    content: z.string()
    })
export const updateBlogSchema = z.object({
        title: z.string(),
        content: z.string()
    })

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type PostBlogInput = z.infer<typeof postBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;