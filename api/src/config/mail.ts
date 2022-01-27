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
        to: "wilkuwdr2008@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    },
    forgotPassword: {
        from: '"Paweł Wilk" <wiluwdr@onet.eu>', // sender address
        to: "wilkuwdr2008@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    }
}

const config: mailCredentials = {
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: 'leif.lebsack45@ethereal.email',
        pass: '8P7pDjur3q2kk7Bh8Y',
    },
};

export {config, mails};
