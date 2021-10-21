import { getRepository } from "typeorm";
import { User } from '../models';

export interface UserPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface userFilters {
    where?: Record<string, number> | string;
    limit?: number;
    order?: Record<string, string>;
    skip?:  number;
}

export const getUsers = async(payload: userFilters): Promise<Array<any>> => {
    const userRepository = getRepository(User);

    const {where, take, order, skip} = {
        where: payload.where ? payload.where : {},
        take:  payload.limit ? payload.limit : 5,
        order: payload.order ? payload.order : { "id": "DESC" },
        skip:  payload.skip  ? payload.skip  : 0
    }

    return userRepository.find( {
        where,
        take,
        order,
        skip
    });
}


export const createUser = async(payload: UserPayload): Promise<User> => {
    const userRepository = getRepository(User);
    const user = new User();

    return userRepository.save({
        ...user,
        ...payload
    });
}