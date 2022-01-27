import { getUsers } from './user.controller';
import { compareData } from './hashing.controller';

type queryResults = {
    [where: string]: Record<string, string>
}

export const areCredentialsValid = async ({where: whereQuery}: queryResults): Promise<boolean> => {
    const [ User ] : any = await getUsers({ where: {email: whereQuery.email} });
    const compareResult: boolean = await compareData(User.password, whereQuery.password);

    if ( compareResult ) return true;
    return false;
}