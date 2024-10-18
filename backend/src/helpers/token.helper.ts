import jwt from "jsonwebtoken";

export const GenerateToken = async (payload: any) => {
    return await jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 })
}