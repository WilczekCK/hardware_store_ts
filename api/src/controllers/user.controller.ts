import { getRepository, getConnection } from "typeorm";
import { User } from '../models';

export interface UserPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface userFilters {
    where?: Record<string, number> | string | any;
    limit?: number;
    order?: Record<string, string>;
    skip?:  number;
}

export const getUsers = async(payload: userFilters): Promise<Array<any>> => {
    const userRepository = getRepository(User);

    const preparedQuery = {
        where: payload.where ? payload.where : {},
        take:  payload.limit ? payload.limit : 5,
        order: payload.order ? payload.order : { "id": "DESC" },
        skip:  payload.skip  ? payload.skip  : 0
    }

    return userRepository.find( preparedQuery );
}

export const removeUsers = async(payload: userFilters): Promise<any> => {
    const test = payload.where;
    
    console.log( test )

    getConnection()
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", test)
        .execute();

    return {status: 200};
}

export const createUser = async(payload: UserPayload): Promise<User> => {
    const userRepository = getRepository(User);
    const user = new User();

    return userRepository.save({
        ...user,
        ...payload
    });
}