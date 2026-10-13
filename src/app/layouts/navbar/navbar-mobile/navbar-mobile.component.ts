import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import {
  LucideChevronDown,
  LucideContrast,
  LucideEye,
  LucideLanguages,
  LucideMenu,
  LucideMoon,
  LucidePalette,
  LucideSun,
  LucideX,
} from '@lucide/angular';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from '../../../services/theme.service';

type NavigationItem = { label: string; id: string };

@Component({
  selector: 'app-navbar-mobile',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslatePipe,
    LucideChevronDown,
    LucideContrast,
    LucideEye,
    LucideLanguages,
    LucideMenu,
    LucideMoon,
    LucidePalette,
    LucideSun,
    LucideX,
  ],
  templateUrl: './navbar-mobile.component.html',
  styleUrl: './navbar-mobile.component.css',
})
export class NavbarMobileComponent {
  @Input({ required: true }) navItems: NavigationItem[] = [];
  @Input({ required: true }) activeSection: string | null = null;
  @Input({ required: true }) currentLang: 'es' | 'en' = 'es';
  @Input({ required: true }) isThemeMenuOpen = false;
  @Input({ required: true }) isLangMenuOpen = false;
  @Input({ required: true }) themeService!: ThemeService;

  @Output() readonly sectionNavigate = new EventEmitter<{
    event: MouseEvent;
    sectionId: string;
  }>();
  @Output() readonly themeMenuToggle = new EventEmitter<MouseEvent>();
  @Output() readonly languageMenuToggle = new EventEmitter<MouseEvent>();
  @Output() readonly languageChange = new EventEmitter<'es' | 'en'>();
  @Output() readonly baseThemeToggle = new EventEmitter<void>();
  @Output() readonly colorblindToggle = new EventEmitter<void>();
  @Output() readonly cvDownload = new EventEmitter<void>();
  @Output() readonly menusClose = new EventEmitter<void>();

  isMenuOpen = false;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  @HostListener('click', ['$event'])
  stopClickPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: MouseEvent): void {
    if (this.isMenuOpen && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.isMenuOpen = false;
      this.menusClose.emit();
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.menusClose.emit();
    }
  }

  closeMobileMenu(): void {
    this.isMenuOpen = false;
    this.menusClose.emit();
  }

  navigate(event: MouseEvent, sectionId: string): void {
    this.isMenuOpen = false;
    this.sectionNavigate.emit({ event, sectionId });
  }

  requestCvDownload(): void {
    this.isMenuOpen = false;
    this.menusClose.emit();
    this.cvDownload.emit();
  }
}
