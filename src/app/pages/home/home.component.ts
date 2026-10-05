import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { DotsDividerComponent } from '../../shared/components/dividers/divider-page.component';
import { DividerComponent } from '../../shared/components/dividers/divider.component';
import { AboutMeComponent } from '../about-me/about-me.component';
import { ContactComponent } from '../contact/contact.component';
import { ExperienceComponent } from '../experience/experience.component';
import { ProjectsComponent } from '../projects/projects.component';
import { StackComponent } from '../stack/stack.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TranslatePipe,
    DividerComponent,
    ButtonComponent,
    AboutMeComponent,
    StackComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent,
    DotsDividerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  title = 'home.title';
  subtitle = 'home.subtitle';
  ctaText = 'home.projectsCta';
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'instant',
        block: 'start',
      });
    }
  }
}
