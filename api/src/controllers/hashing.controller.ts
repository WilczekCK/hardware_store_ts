import { hash, compare } from "bcrypt";

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

export const compareData = async (sentData: string, hashedData: string): Promise<boolean> => {
    return compare(sentData, hashedData).then((result) => result)
}