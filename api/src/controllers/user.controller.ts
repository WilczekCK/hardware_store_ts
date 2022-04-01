import { DeleteResult, getConnection, getRepository, UpdateResult, Raw } from "typeorm";
import { User } from '../models';
import { hashData, compareData} from "./hashing.controller";
import { sendVerificationEmail, generateVerificationString } from "./auth.controller";
import { stringify } from "querystring";


export interface UserPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    oldPassword: string;
    verificationCode: string;
    isVerified: boolean;
}

export interface userFilters {
    where?: Record<string, number> | string | any;
    limit?: number; 
    take?: number; //its basically a limit, clone
    order?: Record<string, string>;
    skip?:  number;
    set?:   Record<string, string> | Record<string, Date> | Record<string, boolean>;
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

    /* Query returns info, how many results are deleted and raw info */
    return await getConnection()
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("id IN (:...ids)", { ids } )
        .execute();
}

export const createUser = async(payload: UserPayload): Promise<User|Boolean> => {
    const userRepository = getRepository(User);
    const user = new User();

    //Check, if the user exists, prevent duplicates
    const userExists = await getUsers( {where: { email: payload.email }} );
    if( userExists.length > 0 ) return false;
    
    // Secure the password!
    payload.password = await hashData(payload.password);

    // Assign the verify code
    user.verificationCode = generateVerificationString();
    user.isVerified = false;
    await sendVerificationEmail(payload.firstName, payload.email, user.verificationCode);

    return userRepository.save({
        ...user,
        ...payload
    });
}

export const modifyUser = async(payload: userFilters): Promise<Record<string, number|string> | UpdateResult> => {
    let { where, set }:userFilters = {
        where:    payload.where ? payload.where : {},
        set:      payload.set  ? {...payload.set, updatedAt:new Date()}  : {},
    }

    //WHERE, for single user, must have only ONE value!
    const key:String = Object.keys(payload.where)[0];

    //PASSWORD, hash new password if changed
    const passwordIndex = Object.keys(set).findIndex(key => key === "password");
    const oldPasswordIndex = Object.keys(set).findIndex(key => key === "oldPassword");
    if( passwordIndex > 0 && oldPasswordIndex > 0) {
        const newPassword = await hashData(Object.values(set)[passwordIndex].toString());
        set.password = newPassword;
        
        const [ User ] = await getUsers( {where: {id: where.id}} );
        const isOldPasswordValid = await compareData(User.password, Object.values(set)[oldPasswordIndex].toString());

        delete set.oldPassword;

        if (!isOldPasswordValid) return { status: 201, affected: 0 };
    }

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
