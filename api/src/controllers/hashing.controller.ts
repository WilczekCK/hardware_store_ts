import { Connection, DeleteResult, getConnection, getRepository, UpdateResult } from "typeorm";
import { genSalt, hash, compare } from "bcrypt";

const saltRounds: number = 10;

export const hashPassword = async (password: string): Promise<boolean> => {
    try {
        genSalt(saltRounds, function(err:Error | undefined, salt: string):Boolean {
            hash(password, salt, function(err: Error | undefined, hash: string):any {
                console.log(hash);
                return true;
            });
    
            return false;
        });
    } catch (err) {
        console.log(err);
        return false;

    }

    return false;
}