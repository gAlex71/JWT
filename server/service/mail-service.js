const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST_MAIL,
            port: process.env.SMTP_PORT_MAIL,
            secure: false,
            auth: {
                user: process.env.SMTP_USER_MAIL,
                pass: process.env.SMTP_PASSWORD_MAIL
            }
        })
    }
    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER_MAIL,
            to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html: 
                `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href='${link}'>${link}</a>
                    </div>
                `
        })
    }
}

module.exports = new MailService();