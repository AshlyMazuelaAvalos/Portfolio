import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  readonly links = {
    github: 'https://github.com/AshlyMazuelaAvalos',
    linkedin: 'https://www.linkedin.com/in/ashlymazuela/',
    email: 'mailto:ashlymazuela@gmail.com',
  };
}
