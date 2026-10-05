import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  readonly links = {
    github: 'https://github.com/AshlyMazuelaAvalos',
    linkedin: 'https://www.linkedin.com/in/ashlymazuela/',
    email: 'mailto:ashlymazuela@gmail.com',
  };
}
