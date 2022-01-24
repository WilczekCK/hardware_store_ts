import { genSalt, hash, compare } from "bcrypt";

const saltRounds: number = 10;

export const hashData = async (dataToHash: string): Promise<string | boolean> => {
    try {
        genSalt(saltRounds, (err:Error | undefined, salt: string): Boolean => {
            hash(dataToHash, salt, (err: Error | undefined, hash: string): Boolean | string  => {
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

export const compareData = async (dataToHash: string, hash: string): Promise<boolean> => {
    try{
        compare(dataToHash, hash, (err, result): Error | Boolean => result)
    } catch (err) {
        console.log(err);
        return false;
    }

    return false;
}