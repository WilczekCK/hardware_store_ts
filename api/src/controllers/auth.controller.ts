import { getUsers } from './user.controller';

export const areCredentialsValid = async (email:string, password:string): Promise<Boolean> => {

    const userInfo = await getUsers({
        where: {
            email
        }
    })

    console.log( userInfo );

    return true;
}