import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { EmailService } from '../../services/email.service';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;
  let component: ContactComponent;
  let sendCalls: number;

  beforeEach(async () => {
    sendCalls = 0;
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [
        provideTranslateService(),
        {
          provide: EmailService,
          useValue: {
            sendContact: () => {
              sendCalls += 1;
              return of('OK');
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('does not send or show validation errors when the honeypot is filled', async () => {
    component.contactForm.controls.phone.setValue('555-0100');
    await component.submitContact();

    expect(sendCalls).toBe(0);
    expect(component.submitAttempted()).toBe(false);
    expect(component.emailSent()).toBe(false);
  });
});
