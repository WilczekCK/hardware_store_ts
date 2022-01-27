import { getUsers } from './user.controller';
import { compareData } from './hashing.controller';

export const areCredentialsValid = async ({where: whereQuery}: Record<string,any>): Promise<boolean> => {
    const [ User ] : any = await getUsers({ where: {email: whereQuery.email} });
    const compareResult: boolean = await compareData(User.password, whereQuery.password);

    if( compareResult ) {
        return true;
    }

    return false;
}