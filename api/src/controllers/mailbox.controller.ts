import { Connection, DeleteResult, getConnection, getRepository, UpdateResult } from "typeorm";
import { Auction, User, Message, Mailbox } from '../models';

export interface mailPayload {

}

export interface mailFilters {
    where?: Record<string, number> | string | any;
    limit?: number; 
    take?: number; //its basically a limit, clone
    order?: Record<string, string>;
    skip?:  number;
    set?:   Record<string, string> | Record<string, Date>;
    operator?: string;
    relations?: string[] | undefined;
}

export const getMails = async(payload: mailFilters): Promise<any> => {
    const mailsRepository = getRepository(Mailbox);

    const preparedQuery:mailFilters = {
        where: payload.where ? payload.where : {},
        take:  payload.limit ? payload.limit : 5,
        order: payload.order ? payload.order : { "id": "DESC" },
        skip:  payload.skip  ? payload.skip  : 0,
        relations: payload.relations ? payload.relations : undefined,
    }

    return mailsRepository.find( preparedQuery );
}

export const removeMails = async (payload: mailFilters): Promise<DeleteResult> => {
    const messageId = payload.where;

    // Object to ID's array
    const ids:Array<number> = messageId.map(( {id}: Record<string,number> ) => {
        return id;
    });

    /* Query returns info, how many results are deleted and raw info*/
    return await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Auction)
        .where("id IN (:...ids)", { ids } )
        .execute();
}

export const createMail = async(): Promise<Mailbox> => {
    const mailsRepository = getRepository(Mailbox);

    //Relation assigments
    const mailbox = new Mailbox();

    return mailsRepository.save({
        ...mailbox
    });
}

export const modifyMail = async(payload: mailFilters): Promise<UpdateResult> => {
    const { where, set }:mailFilters = {
        where:    payload.where ? payload.where : {},
        set:      payload.set  ? {updatedAt:new Date(), ...payload.set}  : {},
    }

    //WHERE, for single user, must have only ONE value!
    const key:String = Object.keys(payload.where)[0];

    return await getConnection()
        .createQueryBuilder()
        .update(Auction)
        .set(set)
        .where(`${key} = :${key}`, where)
        .execute();
}

export const modifyMails = async(payload: mailFilters): Promise<UpdateResult> => {
    const { where, set }:mailFilters = {
        where:    payload.where ? payload.where : {},
        set:      payload.set  ? {updatedAt:new Date(), ...payload.set} : {},
    }

    return await getConnection()
        .createQueryBuilder()
        .update(Auction)
        .set(set)
        .where(where)
        .execute();
}
