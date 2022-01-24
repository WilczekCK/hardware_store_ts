import { Connection, DeleteResult, getConnection, getRepository, UpdateResult } from "typeorm";
import { genSalt, hash, compare } from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, 10);
}