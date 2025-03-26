import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailOptions } from './interfaces/IEmail.interface';

@Injectable()
export class EmailService {
    private transporter;
    private defaultFrom: string;

    constructor(
        @Inject('EMAIL_OPTIONS') private readonly options: EmailOptions, // Usando InjectionToken
    ) {
        this.transporter = nodemailer.createTransport({
            host: options.host,
            port: options.port,
            auth: options.auth,
        });
        this.defaultFrom = options.from || 'no-reply@example.com';
    }

    async sendPasswordResetEmail(to: string, token: string): Promise<void> {
        const resetUrl = `http://seu-site.com/reset-password?token=${token}`;
        await this.transporter.sendMail({
            from: this.defaultFrom,
            to,
            subject: 'Redefinição de Senha',
            html: `<p>Clique <a href="${resetUrl}">aqui</a> para redefinir sua senha.</p>`,
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