import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgOptimizedImage,
    TranslatePipe,
    DividerComponent,
    ButtonComponent,
    DotsDividerComponent,
    AboutMeComponent,
    StackComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly title = 'home.title';
  readonly subtitle = 'home.subtitle';
  readonly ctaText = 'home.projectsCta';
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
