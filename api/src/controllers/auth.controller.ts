/*
    TODO:   
    - Password reset
    - Email verification <- done
    - OAuth
*/
import { getUsers, modifyUser } from './user.controller';
import { compareData, hashData } from './hashing.controller';
import { createTransport, Transporter } from 'nodemailer';
import { config, mails } from '../config/mail';

type queryResults = {
    [where: string]: Record<string, string>
}

export const areCredentialsValid = async ({where: whereQuery}: queryResults): Promise<boolean> => {
    const [ User ] : any = await getUsers({ where: {email: whereQuery.email} });
    if ( !User ) return false;

    const compareResult: boolean = await compareData(User.password, whereQuery.password);
    if ( !compareResult ) return false;

    return true;
}

export const generateVerificationString = (): string => {
    const letterArray: string[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
    return letterArray.sort(() => 0.5 - Math.random()).join("");
}

export const sendVerificationEmail = async ( firstName:string, email: string, verificationCodeAssigned: string ): Promise<boolean> => {
    const transporter:Transporter = createTransport(config);

    const { html, to }:Record<string,string> = mails.verification;
    const mailSent:Record<string,number> = await transporter.sendMail({
        to:   to.replace("[mail_to]", email),
        html: html.replace("[verify_code]", verificationCodeAssigned)
                  .replace("[name]", firstName),
        ...mails,
    });

    if ( !mailSent.response ) return false;
    return true;
}

export const isVerificationCodeValid = async ({where: whereQuery}: queryResults): Promise<boolean> => {
    const [ User ] : any = await getUsers({ 
        where: [
            {verificationCode: whereQuery.verificationCode}, 
            {isVerified: false}
        ],
        operator: 'AND' 
    });
    if ( !User || !whereQuery.verificationCode) return false;

    return true;
}  

export const verifyUser = async ({where: whereQuery}: queryResults): Promise<boolean> => {
    const [ User ] : any = await getUsers({ where: {id: whereQuery.id} });
    if ( !User ) return false;

    const { affected, raw } :any = await modifyUser({
        where: {verificationCode: whereQuery.verificationCode},
        set: {isVerified: true}
    })
    if ( !affected ) return false;

    return true;
}

export const changeForgottenPassword = async({where: whereQuery}: queryResults): Promise<boolean> => {
    const newHashedPassword = await hashData(whereQuery.password);
    const { affected, raw } :any = await modifyUser({
        where: {verificationCode: whereQuery.verificationCode},
        set: {password: newHashedPassword}
    })
    if ( !affected ) return false;

    return true;
}

export const sendForgotPasswordEmail = async ({where: whereQuery}: queryResults, verificationCode: string): Promise<boolean> => {
    const transporter:Transporter = createTransport(config);
    const firstName = 'test';
    const { html, to }:Record<string,string> = mails.forgotPassword;

    const mailSent:Record<string,number> = await transporter.sendMail({
        to:   to.replace("[mail_to]", whereQuery.email),
        html: html.replace("[password_generated]", verificationCode)
                  .replace("[name]", firstName),
        ...mails,
    });
    if ( !mailSent.response ) return false;

    return true;
}