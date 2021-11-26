import { Connection, DeleteResult, getConnection, getRepository, UpdateResult } from "typeorm";
import { Auction, User, Message, Mailbox } from '../models';
import { createMail } from './mailbox.controller';

export interface messagePayload {
    content: string;
    isOpened: boolean;
    userFrom: number;
    userTo: number;
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
    const messageRepository = getRepository(Message);

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

export const createMessage = async(payload: messagePayload): Promise<Message> => {
    const messageRepository = getRepository(Message);

    //Relation assigments
    const userFrom = new User();
          userFrom.id = payload.userFrom;
    const userTo = new User();
          userTo.id = payload.userTo;
    const message = new Message();
          message.userTo = userTo;
          message.userFrom = userFrom;

    const response = await messageRepository.save({
        ...payload,
        ...message
    });

    //Create mail in inbox!
    //await createMail({ subjectId: response.id });

    return response;
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
