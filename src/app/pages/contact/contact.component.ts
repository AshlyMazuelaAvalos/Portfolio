import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideCircleX } from '@lucide/angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, TranslatePipe, LucideCircleX],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly translate = inject(TranslateService);
  private readonly emailService = inject(EmailService);
  readonly submitAttempted = signal(false);
  readonly isSending = signal(false);
  readonly emailSent = signal(false);
  readonly sendFailed = signal(false);

  readonly contactForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    message: new FormControl('', { nonNullable: true, validators: Validators.required }),
    phone: new FormControl('', { nonNullable: true }),
  });

  clearField(field: keyof typeof this.contactForm.controls): void {
    this.contactForm.controls[field].reset();
  }

  async submitContact(): Promise<void> {
    if (this.contactForm.controls.phone.value.trim()) {
      console.warn('Contact form submission blocked by honeypot.');
      return;
    }

    this.submitAttempted.set(true);
    this.emailSent.set(false);
    this.sendFailed.set(false);

    if (this.isSending()) {
      return;
    }

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const { name, email, message } = this.contactForm.getRawValue();
    this.isSending.set(true);

    try {
      await this.emailService.sendContact({
        name,
        email,
        message,
        subject: this.translate.instant('sections.contact.emailSubject', { name }),
      });
      this.emailSent.set(true);
      this.contactForm.reset();
      this.submitAttempted.set(false);
    } catch (error) {
      const details =
        typeof error === 'object' && error !== null && ('status' in error || 'text' in error)
          ? {
              status: 'status' in error ? error.status : undefined,
              response: 'text' in error ? error.text : undefined,
            }
          : error;
      console.error('EmailJS contact submission failed.', details);
      this.sendFailed.set(true);
    } finally {
      this.isSending.set(false);
    }
  }
}
