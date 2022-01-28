/*
    TODO:   
    - Password reset
    - Email verification
    - User deletion
    - OAuth
*/
import { getUsers } from './user.controller';
import { compareData } from './hashing.controller';
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
        ...mails.verification,
    });

    if ( !mailSent.response ) return false;
    return true;
}