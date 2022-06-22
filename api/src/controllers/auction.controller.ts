import { Connection, DeleteResult, getConnection, getRepository, UpdateResult } from "typeorm";
import { Auction, User } from '../models';

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
    
    console.log(preparedQuery);

    return auctionRepository.find( preparedQuery );
}

export const isLimitOfAuctionsCrossed = async(userId: number): Promise<boolean> => {
    const getUserAuctions = await getAuctions({
        where:{
            user: userId,
        },
        limit: 5,
        relations: ["user"]
    })

    return getUserAuctions.length >= 10;
}

export const removeAuctions = async (payload: auctionFilters): Promise<DeleteResult> => {
    const auctionsId = payload.where.id;


    // Object to ID's array
    const ids:Array<number> = auctionsId.map(( id: Record<string,number> ) => {
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

export const createAuction = async(payload: auctionPayload): Promise<Auction | any > => {
    const auctionRepository = getRepository(Auction);

    if ( ! await isLimitOfAuctionsCrossed(payload.userId) ) {
        //Relation assigments
        const user = new User();
            user.id = payload.userId;
        const auction = new Auction();
            auction.user = user;

        return auctionRepository.save({
            ...auction,
            ...payload
        });
    } else {
        return {status: 429, message: 'Amount of items crossed' };
    }

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
