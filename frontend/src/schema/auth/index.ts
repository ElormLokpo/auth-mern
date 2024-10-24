import {z} from "zod";


export const registerSchema = z.object({
    firstname: z.string({message:"Only letters are allowed. No numbers and special symbols"}).min(1, {message:"Firstname is required"}).regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters'),
    lastname: z.string({message:"Only letters are allowed. No numbers and special symbols"}).min(1, {message:"Lastname is required"}).regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters'),
    email: z.string().email({message:"Enter a valid email address"}).min(1, {message:"Firstname is required"}),
    password: z.string().min(1, {message:"Password is required"}),
    othernames: z.string().optional(),
    address: z.string().optional(),
    zip_code:z.string().optional(),
   
})

export const loginSchema = z.object({
   email: z.string().email({message:"Enter a valid email address"}).min(1, {message:"Firstname is required"}),
    password: z.string().min(1, {message:"Password is required"}),
   
})