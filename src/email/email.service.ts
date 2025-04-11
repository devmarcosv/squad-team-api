import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailOptions } from './interfaces/IEmail.interface';

@Injectable()
export class EmailService {
    private transporter;
    private defaultFrom: string;

    constructor(
        @Inject('EMAIL_OPTIONS') private readonly options: EmailOptions,
    ) {
        this.transporter = nodemailer.createTransport({
            host: options.host,
            port: options.port,
            auth: options.auth,
        });
        this.defaultFrom = options.from || 'no-reply@example.com';
    }

    async sendPasswordResetEmail(to: string, token: string): Promise<void> {
        const resetUrl = `http://localhost:3000/auth/reset-password?token=${token}`;
        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Redefinição de Senha</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6;">
            <!-- Container principal -->
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: #f7f7f7;">
                <!-- Cabeçalho -->
                <tr>
                    <td style="padding: 30px 20px; text-align: center; background-color: #2c3e50;">
                        <h1 style="color: #ffffff; margin: 0;">Redefinição de Senha</h1>
                    </td>
                </tr>
    
                <!-- Conteúdo -->
                <tr>
                    <td style="padding: 30px 20px; background-color: #ffffff;">
                        <p style="color: #333333; margin: 0 0 20px 0;">Olá,</p>
                        <p style="color: #333333; margin: 0 0 20px 0;">Recebemos uma solicitação para redefinir sua senha. Clique no botão abaixo para continuar:</p>
                        
                        <!-- Botão de ação -->
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetUrl}" 
                               style="background-color: #3498db; 
                                      color: #ffffff; 
                                      padding: 12px 25px; 
                                      text-decoration: none; 
                                      border-radius: 4px;
                                      display: inline-block;
                                      font-weight: bold;">
                                Redefinir Senha
                            </a>
                        </div>
    
                        <!-- Token alternativo -->
                        <p style="color: #666666; margin: 0 0 20px 0; font-size: 14px;">
                            Se o botão não funcionar, copie e cole este link no seu navegador:<br>
                            <span style="word-break: break-all; color: #3498db;">${resetUrl}</span>
                        </p>
    
                        <!-- Aviso de segurança -->
                        <p style="color: #e74c3c; margin: 30px 0 0 0; font-size: 12px;">
                            ⚠️ Este link expirará em 1 hora por motivos de segurança.
                        </p>
                    </td>
                </tr>
    
                <!-- Rodapé -->
                <tr>
                    <td style="padding: 20px; text-align: center; background-color: #ecf0f1;">
                        <p style="color: #666666; margin: 0; font-size: 12px;">
                            Caso não tenha solicitado esta alteração, ignore este email.<br>
                            Dúvidas? Contate nosso suporte: suporte@empresa.com
                        </p>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `;
        await this.transporter.sendMail({
            from: this.defaultFrom,
            to,
            subject: 'Redefinição de Senha',
            html: htmlContent,
        });
    }

    async sendEmail(
        to: string,
        subject: string,
        html: string,
    ): Promise<void> {
        await this.transporter.sendMail({
            from: this.defaultFrom,
            to,
            subject,
            html,
        });
    }

}