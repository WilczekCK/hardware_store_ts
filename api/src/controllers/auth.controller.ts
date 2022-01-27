/*
    TODO:   
    - Password reset
    - Email verification
    - User deletion
    - OAuth
*/
import { getUsers } from './user.controller';
import { compareData } from './hashing.controller';
import { createTestAccount, createTransport } from 'nodemailer';
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

export const sendVerificationEmail = async (): Promise<boolean> => {
    const testAccount = await createTestAccount();
    const transporter = createTransport(config)

    const mailSent = await transporter.sendMail(mails.verification);

    console.log("Message sent: %s", mailSent.messageId);

    return true;
}