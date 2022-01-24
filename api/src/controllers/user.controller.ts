import { DeleteResult, getConnection, getRepository, UpdateResult } from "typeorm";
import { User } from '../models';
import { hashData, compareData } from "./hashing.controller";


export interface UserPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface userFilters {
    where?: Record<string, number> | string | any;
    limit?: number; 
    take?: number; //its basically a limit, clone
    order?: Record<string, string>;
    skip?:  number;
    set?:   Record<string, string> | Record<string, Date>;
    operator?: string;
}

export const getUsers = async(payload: userFilters): Promise<any> => {
    const userRepository = getRepository(User);

    const preparedQuery:userFilters = {
        where: payload.where ? payload.where : {},
        take:  payload.limit ? payload.limit : 5,
        order: payload.order ? payload.order : { "id": "DESC" },
        skip:  payload.skip  ? payload.skip  : 0,
    }

    return userRepository.find( preparedQuery );
}

export const removeUsers = async (payload: userFilters): Promise<DeleteResult> => {
    const { usersId: ids } = payload.where;

    console.log(ids);

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
          
    // Secure the password!
    payload.password = await hashData(payload.password);

    return userRepository.save({
        ...user,
        ...payload
    });
}

export const modifyUser = async(payload: userFilters): Promise<UpdateResult> => {
    const { where, set }:userFilters = {
        where:    payload.where ? payload.where : {},
        set:      payload.set  ? {updatedAt:new Date(), ...payload.set}  : {},
    }

    //WHERE, for single user, must have only ONE value!
    const key:String = Object.keys(payload.where)[0];

    return await getConnection()
        .createQueryBuilder()
        .update(User)
        .set(set)
        .where(`${key} = :${key}`, where)
        .execute();
}

export const modifyUsers = async(payload: userFilters): Promise<UpdateResult> => {
    const { where, set }:userFilters = {
        where:    payload.where ? payload.where : {},
        set:      payload.set  ? {updatedAt:new Date(), ...payload.set} : {},
    }

    return await getConnection()
        .createQueryBuilder()
        .update(User)
        .set(set)
        .where(where)
        .execute();
}
