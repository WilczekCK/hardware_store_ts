import { Connection, DeleteResult, getConnection, getRepository, UpdateResult } from "typeorm";
import { Auction, User } from '../models';

export interface messagePayload {
    brand: string;
    series: string;
    description: string;
    isActive: boolean;
    price: number;
    userId: number;
}

export interface messageFilters {
    where?: Record<string, number> | string | any;
    limit?: number; 
    take?: number; //its basically a limit, clone
    order?: Record<string, string>;
    skip?:  number;
    set?:   Record<string, string> | Record<string, Date>;
    operator?: string;
    relations?: string[] | undefined;
}

export const getMessages = async(payload: messageFilters): Promise<any> => {
    const messageRepository = getRepository(Auction);

    const preparedQuery:messageFilters = {
        where: payload.where ? payload.where : {},
        take:  payload.limit ? payload.limit : 5,
        order: payload.order ? payload.order : { "id": "DESC" },
        skip:  payload.skip  ? payload.skip  : 0,
        relations: payload.relations ? payload.relations : undefined,
    }

    return messageRepository.find( preparedQuery );
}

export const removeMessages = async (payload: messageFilters): Promise<DeleteResult> => {
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

export const createMessage = async(payload: messagePayload): Promise<Auction> => {
    const messageRepository = getRepository(Auction);

    //Relation assigments
    const user = new User();
          user.id = payload.userId;
    const auction = new Auction();
          auction.user = user;

    return messageRepository.save({
        ...auction,
        ...payload
    });
}

export const modifyMessage = async(payload: messageFilters): Promise<UpdateResult> => {
    const { where, set }:messageFilters = {
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

export const modifyMessages = async(payload: messageFilters): Promise<UpdateResult> => {
    const { where, set }:messageFilters = {
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
