import {z} from 'zod'

export const usernameValidation = z
    .string()
    .min(2, 'Username must be at least 2 characters long')
    .max(20, 'Username must be at most 20 characters long')
    
export const signUpSchema=z.object({
    username: usernameValidation,
    email: z.string().email(),
    password: z.string().min(6, {message: 'Password must be at least 6 chars long'}),
})