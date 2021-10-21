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
    order?: Record<string, number> | string;
}

export const getAllUsers = async(): Promise<Array<any>> => {
    const userRepository = getRepository(User);

    return userRepository.find({});
}

export const getUsers = async(payload: userFilters): Promise<Array<any>> => {
    const userRepository = getRepository(User);

    const {where, take, order} = {
        where: payload.where ? payload.where : {},
        take:  payload.limit ? payload.limit : 5,
        order: payload.order ? payload.order : { "id": "DESC" },
    }

    return userRepository.find( {
        where,
        take,
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