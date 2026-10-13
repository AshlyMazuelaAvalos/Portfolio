import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FooterMobileComponent } from './footer-mobile/footer-mobile.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslatePipe, FooterMobileComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}
