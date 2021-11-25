import { Connection, DeleteResult, getConnection, getRepository, UpdateResult } from "typeorm";

import { Auction, User } from '../models';
import { getUsers } from './user.controller';

export interface auctionPayload {
    brand: string;
    series: string;
    description: string;
    isActive: boolean;
    price: number;
    userId: number;
}

export interface auctionFilters {
    where?: Record<string, number> | string | any;
    limit?: number; 
    take?: number; //its basically a limit, clone
    order?: Record<string, string>;
    skip?:  number;
    set?:   Record<string, string> | Record<string, Date>;
    operator?: string;
    relations?: string[] | undefined;
}

export const getAuctions = async(payload: auctionFilters): Promise<any> => {
    const auctionRepository = getRepository(Auction);

    const preparedQuery:auctionFilters = {
        where: payload.where ? payload.where : {},
        take:  payload.limit ? payload.limit : 5,
        order: payload.order ? payload.order : { "id": "DESC" },
        skip:  payload.skip  ? payload.skip  : 0,
        relations: payload.relations ? payload.relations : undefined,
    }

    return auctionRepository.find( preparedQuery );
}

export const removeAuction = async (payload: auctionFilters): Promise<DeleteResult> => {
    const auctionsId = payload.where;

    // Object to ID's array
    const ids:Array<number> = auctionsId.map(( {id}: Record<string,number> ) => {
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

export const createAuction = async(payload: auctionPayload): Promise<Auction> => {
    const auctionRepository = getRepository(Auction);
    const userRepository = getRepository(User);
    
    const auction = new Auction();

    const { userId } = payload;
    //const user = await getUsers({where: { id: userId }});

    const user = new User();
    user.id = userId;

    auction.user = user;

    return auctionRepository.save({
        ...auction,
        ...payload
    });
}

export const modifyAuction = async(payload: auctionFilters): Promise<UpdateResult> => {
    const { where, set }:auctionFilters = {
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

export const modifyAuctions = async(payload: auctionFilters): Promise<UpdateResult> => {
    const { where, set }:auctionFilters = {
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
