import * as nodemailer from 'nodemailer'
export const EmailService = async (email: string, code: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_GOOGLE,
            pass: process.env.SENHA_GOOGLE
        }
    })

    await transporter.sendMail({
        from: process.env.EMAIL_GOOGLE,
        to: email,
        subject: 'Código de verificação',
        text: `Seu código de verificação é: ${code}`
    })
}
