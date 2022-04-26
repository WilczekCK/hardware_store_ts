type mailCredentials = {
    host: string,
    port: number,
    auth: Record<string, string>
}

type mailContent = {
    [key: string]: Record<string,string>
}

const mails:mailContent = {
    verification: {
        from: '"Paweł Wilk" <wiluwdr@onet.eu>', // sender address
        to: "[mail_to]", // list of receivers
        subject: "YourWebsite.com | Mail Verification", // Subject line
        text: "TBD", // plain text body
        html: "<b>Hello [name], this is your verification code [verify_code] </b>", // html body
    },
    forgotPassword: {
        from: '"Paweł Wilk" <wiluwdr@onet.eu>', // sender address
        to: "[mail_to]", // list of receivers
        subject: "YourWebsite.com | Password Reset", // Subject line
        text: "TBD", // plain text body
        html: "<b>Hello [name], your link to change forgotten password to change password is [link]/forgetPassword/[password_generated] </b>", // html body
    }
}

const config: mailCredentials = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'devon.predovic57@ethereal.email',
        pass: 'jBtFnG9uUCddgcJNYC'
    }
};

export {config, mails};
