import nodemailer, { SentMessageInfo } from 'nodemailer';

export const sendMail = async (email: string, token: string): Promise<SentMessageInfo | Error> => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    
    const mailOptions = {
        from: `Central de Triagem <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Redefinição de Senha',
        text: `Você solicitou uma redefinição de senha. Clique no link a seguir para redefinir sua senha: http://seusite.com/reset-password/${token}`,
        html: `Você solicitou uma redefinição de senha. Clique no link a seguir para redefinir sua senha: <a href="http://seusite.com/reset-password/${token}" target="_blank">Redefinir senha</a>`,
    };
    
    try {
        const result = await transporter.sendMail(mailOptions);
        return result
    } catch (error) {
        console.log(error)
        return new Error("Erro ao enviar email")
    }
}