import { genSalt, hash, compare } from "bcrypt";
import { isBooleanObject } from "util/types";

const saltRounds: number = 10;

export const hashData = async (dataToHash: string): Promise<string> => {

    return hash( dataToHash, saltRounds )
        .then(function(hash) {
            return hash;
        })
        .catch(function(err){
            console.log(err);
            throw err;
        })
}

export const compareData = async (dataToHash: string, hash: string): Promise<boolean> => {
    try{
        compare(dataToHash, hash, (err, result): Error | Boolean => result)
    } catch (err) {
        console.log(err);
        return false;
    }

    return false;
}