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
        this.transporter = nodemailer.createTransport(options);
        this.defaultFrom = options.from || 'no-reply@example.com';
    }

    async sendEmail(to: string, subject: string, html: string): Promise<void> {
        await this.transporter.sendMail({
            from: this.defaultFrom,
            to,
            subject,
            html,
        });
    }
}