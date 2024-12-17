import {z} from 'zod'

export const messageSchema=z.object({
    content:z
        .string()
        .min(10,{message:'content must be atleast 10 chars long'})
        .max(300,{message:'content must be at most 300 chars long'})
})