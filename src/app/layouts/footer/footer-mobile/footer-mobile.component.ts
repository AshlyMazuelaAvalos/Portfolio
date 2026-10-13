import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer-mobile',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './footer-mobile.component.html',
  styleUrl: './footer-mobile.component.css',
})
export class FooterMobileComponent {
  @Input({ required: true }) year!: number;
}
