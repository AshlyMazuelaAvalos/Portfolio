import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { DotsDividerComponent } from '../../shared/components/dividers/divider-page.component';
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
    TranslatePipe,
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
export class HomeComponent implements OnInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly isPageVisible = signal(true);
  readonly title = 'home.title';
  readonly subtitle = 'home.subtitle';
  private readonly onVisibilityChange = () => {
    this.isPageVisible.set(!this.document.hidden);
  };

  readonly carouselItems = [
    'home.carousel.dev',
    'home.carousel.des',
    'home.carousel.ux',
    'home.carousel.ui',
    'home.carousel.agile',
    'home.carousel.free',
    'home.carousel.creat',
    'home.carousel.sw-eng',
    'home.carousel.dev',
    'home.carousel.des',
    'home.carousel.ux',
    'home.carousel.ui',
    'home.carousel.agile',
    'home.carousel.free',
    'home.carousel.creat',
    'home.carousel.sw-eng',
    'home.carousel.dev',
    'home.carousel.des',
    'home.carousel.ux',
    'home.carousel.ui',
    'home.carousel.agile',
    'home.carousel.free',
    'home.carousel.creat',
    'home.carousel.sw-eng',
    'home.carousel.dev',
    'home.carousel.des',
    'home.carousel.ux',
    'home.carousel.ui',
    'home.carousel.agile',
    'home.carousel.free',
    'home.carousel.creat',
    'home.carousel.sw-eng',
  ] as const;

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.isPageVisible.set(!this.document.hidden);
    this.document.addEventListener('visibilitychange', this.onVisibilityChange);
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;

    this.document.removeEventListener('visibilitychange', this.onVisibilityChange);
  }

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
