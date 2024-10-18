import bcrypt from "bcrypt";

export const HashPassword = async (plain_password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plain_password, salt);
}

export const ComparePassword = async (plain_password: string, hashed_password: string) => {
    return await bcrypt.compare(plain_password, hashed_password)
}