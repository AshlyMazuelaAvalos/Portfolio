import emailjs from '@emailjs/browser';
import { Injectable } from '@angular/core';
import { EMAILJS_CONFIG } from './emailjs.config';

export interface ContactEmail {
  readonly name: string;
  readonly email: string;
  readonly message: string;
  readonly subject: string;
}

@Injectable({ providedIn: 'root' })
export class EmailService {
  async sendContact(data: ContactEmail): Promise<void> {
    const publicKey = EMAILJS_CONFIG.publicKey.trim();
    if (!publicKey) {
      throw new Error('EmailJS public key is not configured.');
    }

    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      {
        title: data.subject,
        name: data.name,
        email: data.email,
        message: data.message,
      },
      { publicKey },
    );
  }
}
