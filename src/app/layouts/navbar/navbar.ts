import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  themeService = inject(ThemeService);

  // Control de dropdowns
  isThemeMenuOpen = signal<boolean>(false);
  isLangMenuOpen = signal<boolean>(false);
  currentLang = signal<'es' | 'en'>('es');

  navItems = [
    { label: 'Experiencia', id: 'experiencia' },
    { label: 'Proyectos', id: 'proyectos' },
    { label: 'Stack', id: 'stack' },
    { label: 'Sobre mí', id: 'sobre-mi' },
    { label: 'Contacto', id: 'contacto' },
  ];

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
    this.currentLang.set(lang);
    this.isLangMenuOpen.set(false);
  }

  // Cierra los menús si haces clic en cualquier otro lugar de la pantalla
  @HostListener('document:click')
  closeMenus(): void {
    this.isThemeMenuOpen.set(false);
    this.isLangMenuOpen.set(false);
  }

  downloadCV(): void {
    const file =
      this.currentLang() === 'es' ? 'AshlyMazuelaCV_ES_ATS.pdf' : 'AshlyMazuelaCV_EN_ATS.pdf';
    window.open(`/assets/${file}`, '_blank');
  }
}
