import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  HostListener,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  LucideContrast,
  LucideEye,
  LucideLanguages,
  LucideMoon,
  LucidePalette,
  LucideSun,
} from '@lucide/angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme.service';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    TranslatePipe,
    ButtonComponent,
    LucideEye,
    LucideLanguages,
    LucideMoon,
    LucideSun,
    LucideContrast,
    LucidePalette,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent implements AfterViewInit {
  themeService = inject(ThemeService);
  private router = inject(Router);
  private translate = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);

  // Control de dropdowns
  isThemeMenuOpen = signal<boolean>(false);
  isLangMenuOpen = signal<boolean>(false);
  currentLang = computed<'es' | 'en'>(() => (this.translate.currentLang() === 'en' ? 'en' : 'es'));
  activeSection = signal<string | null>(null);

  navItems = [
    { label: 'nav.about', id: 'about-me' },
    { label: 'nav.stack', id: 'stack' },
    { label: 'nav.experience', id: 'experiencia' },
    { label: 'nav.projects', id: 'proyectos' },
    { label: 'nav.contact', id: 'contacto' },
  ];

  ngAfterViewInit(): void {
    this.updateActiveSection();
  }

  @HostListener('window:scroll')
  updateActiveSection(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const activationLine = 68 + Math.min(window.innerHeight * 0.15, 100);
    const sectionIds = ['hero', ...this.navItems.map((item) => item.id)];
    const currentSection = sectionIds
      .map((id) => document.getElementById(id))
      .find((section) => {
        if (!section) {
          return false;
        }

        const bounds = section.getBoundingClientRect();
        return bounds.top <= activationLine && bounds.bottom > activationLine;
      });

    const sectionId = currentSection?.id;
    this.activeSection.set(
      sectionId && this.navItems.some((item) => item.id === sectionId) ? sectionId : null,
    );
  }

  toggleThemeMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.isThemeMenuOpen.update((v) => !v);
    this.isLangMenuOpen.set(false);
  }

  toggleLangMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.isLangMenuOpen.update((v) => !v);
    this.isThemeMenuOpen.set(false);
  }

  setLanguage(lang: 'es' | 'en'): void {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.isLangMenuOpen.set(false);
  }

  navigateToSection(event: MouseEvent, sectionId: string): void {
    event.preventDefault();
    this.closeMenus();

    void this.router.navigate(['/'], { fragment: sectionId }).then(() => {
      const section = document.getElementById(sectionId);
      section?.scrollIntoView({
        behavior: 'instant',
        block: 'start',
      });
      this.updateActiveSection();
    });
  }

  // Cierra los menús si haces clic en cualquier otro lugar de la pantalla
  @HostListener('document:click')
  closeMenus(): void {
    this.isThemeMenuOpen.set(false);
    this.isLangMenuOpen.set(false);
  }

  downloadCV(): void {
    const file =
      this.currentLang() === 'es' ? 'AshlyMazuela_ES_ATS.pdf' : 'AshlyMazuelaCV_EN_ATS.pdf';
    window.open(`assets/${file}`, '_blank');
  }
}
