import { hash, compare } from "bcrypt";

const saltRounds: number = 10;

export const hashData = async (dataToHash: string): Promise<string> => {

    return hash( dataToHash, saltRounds )
        .then(function( hash:string ) {
            return hash;
        })
        .catch(function(err: Error){
            console.log(err);
            throw err;
        })
}

export const compareData = async (hashedData: string, sentData: string): Promise<boolean> => {
    return compare(sentData, hashedData).then(( result:boolean ) => result)
}