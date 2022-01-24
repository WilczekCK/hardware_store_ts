import { Connection, DeleteResult, getConnection, getRepository, UpdateResult } from "typeorm";
import { genSalt, hash, compare } from "bcrypt";

const saltRounds: number = 10;

export const hashPassword = async (password: string): Promise<string | boolean> => {
    try {
        genSalt(saltRounds, (err:Error | undefined, salt: string): Boolean => {
            hash(password, salt, (err: Error | undefined, hash: string): Boolean | string  => {
                console.log(hash);
                return hash;
            });
    
            return false;
        });
    } catch (err) {
        console.log(err);
        return false;
    }

    return false;
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    try{
        compare(password, hash, (err, result): Error | Boolean => result)
    } catch (err) {
        console.log(err);
        return false;
    }

    return false;
}