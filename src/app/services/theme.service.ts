import { Injectable, signal, effect, inject, RendererFactory2, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type BaseTheme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer = inject(RendererFactory2).createRenderer(null, null);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Estados reactivos
  public baseTheme = signal<BaseTheme>(this.getInitialBaseTheme());
  public isColorblind = signal<boolean>(this.getInitialColorblind());

  constructor() {
    if (!this.isBrowser) return;

    // Escucha cambios en las señales y aplica la clase/atributo al HTML
    effect(() => {
      const mode = this.baseTheme();
      const colorblind = this.isColorblind();
      const themeValue = colorblind ? `${mode}-colorblind` : mode;

      this.renderer.setAttribute(document.documentElement, 'data-theme', themeValue);

      localStorage.setItem('portfolio-base-theme', mode);
      localStorage.setItem('portfolio-colorblind', JSON.stringify(colorblind));
    });

    // Escuchar si el usuario cambia el tema en su SO en tiempo real
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('portfolio-base-theme')) {
        this.baseTheme.set(e.matches ? 'dark' : 'light');
      }
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(handleSystemThemeChange);
    }
  }

  private getInitialBaseTheme(): BaseTheme {
    if (this.isBrowser) {
      const saved = localStorage.getItem('portfolio-base-theme') as BaseTheme;
      if (saved === 'dark' || saved === 'light') return saved;
    }

    // Detectar preferencia del sistema operativo / browser
    const prefersLightTheme =
      this.isBrowser && typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-color-scheme: light)').matches
        : true;

    return prefersLightTheme ? 'light' : 'dark';
  }

  private getInitialColorblind(): boolean {
    if (!this.isBrowser) return false;

    const saved = localStorage.getItem('portfolio-colorblind');
    return saved ? JSON.parse(saved) : false;
  }

  /*
  private getInitialBaseTheme(): BaseTheme {
    const saved = localStorage.getItem('portfolio-base-theme') as BaseTheme;
    if (saved === 'dark' || saved === 'light') return saved;

    // Detectar preferencia del sistema operativo / browser
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }

  private getInitialColorblind(): boolean {
    const saved = localStorage.getItem('portfolio-colorblind');
    return saved ? JSON.parse(saved) : false;
  }
  */

  public toggleBaseTheme(): void {
    this.baseTheme.update((val) => (val === 'dark' ? 'light' : 'dark'));
  }

  public toggleColorblind(): void {
    this.isColorblind.update((val) => !val);
  }
}
