import { getUsers } from './user.controller';
import { compareData } from './hashing.controller';

export const areCredentialsValid = async ({where: whereQuery}: Record<string,any>): Promise<Boolean> => {

    const userInfo = await getUsers({
        where: { email: whereQuery.email }
    });

    const { password } = userInfo[0];

    const compareResult = await compareData(password, whereQuery.password);

    console.log(password, whereQuery.password);

    if( compareResult ) {
        console.log('OK!');
        return true;
    }

    console.log('WRONG!');
    return false;
}