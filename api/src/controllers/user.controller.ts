import { getRepository, getConnection, DeleteResult, DeleteQueryBuilder, QueryBuilder } from "typeorm";
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
    set?:   Record<string, string> | Record<string, number>;
    operator?: string;
}

export const getUsers = async(payload: userFilters): Promise<any> => {
    const userRepository = getRepository(User);

    const preparedQuery = {
        where: payload.where ? payload.where : {},
        take:  payload.limit ? payload.limit : 5,
        order: payload.order ? payload.order : { "id": "DESC" },
        skip:  payload.skip  ? payload.skip  : 0,
    }

    return userRepository.find( preparedQuery );
}

export const removeUsers = async (payload: userFilters): Promise<DeleteResult> => {
    const usersId = payload.where;

    // Object to ID's array
    const ids = usersId.map(( {id}: Record<string,number> ) => {
        return id;
    });

    /* Query returns info, how many results are deleted and raw info*/
    return await getConnection()
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("id IN (:...ids)", { ids } )
        .execute();
}

export const createUser = async(payload: UserPayload): Promise<User> => {
    const userRepository = getRepository(User);
    const user = new User();

    return userRepository.save({
        ...user,
        ...payload
    });
}

export const modifyUser = async(payload: UserPayload): Promise<any> => {
    const preparedQuery = {
        where:    payload.where ? payload.where : {},
        skip:     payload.skip  ? payload.skip  : 0,
        operator: payload.operator ? payload.operator : "AND",
    }

    // Object to ID's array
    const ids = preparedQuery.where.map(( {id}: Record<string,number> ) => {
        return id;
    });

    return await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({})
        .where("id IN (:...ids)", { ids } )
        .execute();
}