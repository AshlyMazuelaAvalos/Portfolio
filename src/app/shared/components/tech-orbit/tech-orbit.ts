import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface Technology {
  readonly id: string;
  readonly name: string;
  readonly iconSvg: string;
  readonly category?: string;
  readonly level?: string;
}

interface OrbitConfig {
  readonly scale: number;
  readonly rotateX: number;
  readonly rotateY: number;
  readonly rotateZ: number;
  readonly duration: number;
  readonly reverse: boolean;
}

interface OrbitalTechnology {
  readonly technology: Technology;
  readonly icon: SafeHtml;
  readonly delay: number;
}

interface TechnologyOrbit extends OrbitConfig {
  readonly index: number;
  readonly technologies: readonly OrbitalTechnology[];
}

const DEFAULT_TECHNOLOGIES: readonly Technology[] = [
  {
    id: 'angular',
    name: 'Angular',
    category: 'Frontend',
    level: '3',
    iconSvg:
      '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sat-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--btn-primary-bg)"/><stop offset="100%" stop-color="var(--btn-primary-text)"/></linearGradient></defs><path fill="url(#sat-grad)" d="M24 3 43 10l-3 25-16 10L8 35 5 10 24 3Z"/><path fill="var(--color-navy-dark)" d="m24 10-12 25h5l2.4-6h9.2l2.4 6h5L24 10Zm0 10 3 6h-6l3-6Z"/></svg>',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Frontend',
    level: '3',
    iconSvg:
      '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sat-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--btn-primary-bg)"/><stop offset="100%" stop-color="var(--btn-primary-text)"/></linearGradient></defs><rect fill="url(#sat-grad)" x="4" y="4" width="40" height="40" rx="5"/><path fill="var(--color-navy-dark)" d="M10 20h19v5h-7v15h-5V25h-7v-5Zm20 15c2 2 4 2.5 6 2.5 1.5 0 2.5-.6 2.5-1.6 0-1.2-.8-1.6-3.5-2.8-3.8-1.6-5.8-3.1-5.8-6.7 0-4.1 3.2-6.8 7.8-6.8 2.7 0 4.8.6 6.7 2l-2.6 4c-1.4-.9-2.5-1.3-4-1.3-1.6 0-2.5.7-2.5 1.7 0 1.1.8 1.7 3.5 2.8 4 1.7 5.8 3.3 5.8 6.7 0 4.2-3.1 6.8-7.9 6.8-3.3 0-6.3-1-8.5-3l2.5-4.3Z"/></svg>',
  },
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    level: '2',
    iconSvg:
      '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sat-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--btn-primary-bg)"/><stop offset="100%" stop-color="var(--btn-primary-text)"/></linearGradient></defs><g stroke="url(#sat-grad)" stroke-width="2.5" fill="none"><ellipse cx="24" cy="24" rx="20" ry="7.5"/><ellipse cx="24" cy="24" rx="20" ry="7.5" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="20" ry="7.5" transform="rotate(120 24 24)"/></g><circle cx="24" cy="24" r="3.5" fill="url(#sat-grad)"/></svg>',
  },
  {
    id: 'node',
    name: 'Node.js',
    category: 'Backend',
    level: '4',
    iconSvg:
      '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sat-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--btn-primary-bg)"/><stop offset="100%" stop-color="var(--btn-primary-text)"/></linearGradient></defs><path stroke="url(#sat-grad)" stroke-width="3" fill="none" d="m24 4 18 10v20L24 44 6 34V14L24 4Z"/><path stroke="url(#sat-grad)" stroke-width="2.5" stroke-linecap="round" fill="none" d="M20 31c0 2 1.3 3 3.5 3 2 0 3.2-.9 3.2-2.5 0-1.5-1-2.2-3.5-2.8-2.7-.7-4-1.8-4-4 0-2.5 1.9-4.1 4.8-4.1 2.5 0 4.3 1 4.8 3.1"/></svg>',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Backend and Analytics',
    level: '4',
    iconSvg:
      '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sat-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--btn-primary-bg)"/><stop offset="100%" stop-color="var(--btn-primary-text)"/></linearGradient></defs><path fill="url(#sat-grad)" d="M23 4c-8 0-9 3.5-9 8v5h10v2H9c-4 0-6 3.5-6 9s2 9 6 9h4v-6c0-4 3-7 7-7h10c3 0 5-2 5-5v-7c0-5-4-8-12-8Z"/><path fill="url(#sat-grad)" opacity="0.8" d="M25 44c8 0 9-3.5 9-8v-5H24v-2h15c4 0 6-3.5 6-9s-2-9-6-9h-4v6c0 4-3 7-7 7H18c-3 0-5 2-5 5v7c0 5 4 8 12 8Z"/><circle cx="20" cy="11" r="1.5" fill="var(--color-navy-dark)"/><circle cx="28" cy="37" r="1.5" fill="var(--color-navy-dark)"/></svg>',
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'DevOps',
    level: '2',
    iconSvg:
      '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sat-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--btn-primary-bg)"/><stop offset="100%" stop-color="var(--btn-primary-text)"/></linearGradient></defs><g fill="url(#sat-grad)"><rect x="6" y="19" width="7" height="6" rx="1"/><rect x="15" y="19" width="7" height="6" rx="1"/><rect x="24" y="19" width="7" height="6" rx="1"/><rect x="15" y="11" width="7" height="6" rx="1"/><rect x="24" y="11" width="7" height="6" rx="1"/><rect x="24" y="3" width="7" height="6" rx="1"/><path d="M4 27h39c-2 9-8 14-18 14C14 41 7 37 4 27Z"/></g><path stroke="url(#sat-grad)" stroke-width="2" fill="none" d="M34 22c3-4 7-4 10-2-1 4-4 6-9 6"/></svg>',
  },
  {
    id: 'vue',
    name: 'Vue 3',
    category: 'Frontend',
    level: '4',
    iconSvg:
      '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sat-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--btn-primary-bg)"/><stop offset="100%" stop-color="var(--btn-primary-text)"/></linearGradient></defs><path fill="url(#sat-grad)" d="M4 9h10l10 17L34 9h10L24 43 4 9Z"/><path fill="var(--color-navy-dark)" d="M14 9h10l10 17h-10L14 9Z"/></svg>',
  },
  {
    id: 'nestjs',
    name: 'NestJS',
    category: 'Backend',
    level: '2',
    iconSvg:
      '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sat-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--btn-primary-bg)"/><stop offset="100%" stop-color="var(--btn-primary-text)"/></linearGradient></defs><path stroke="url(#sat-grad)" stroke-width="3" fill="none" d="M24 4 42 14v20L24 44 6 34V14L24 4Z"/><path fill="url(#sat-grad)" d="M15 33V15h4l10 12V15h4v18h-4L19 21v12h-4Z"/></svg>',
  },
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'Mobile',
    level: '4',
    iconSvg:
      '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sat-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--btn-primary-bg)"/><stop offset="100%" stop-color="var(--btn-primary-text)"/></linearGradient></defs><path fill="url(#sat-grad)" d="M27 4h15L17 29l-7-7L27 4Z"/><path fill="url(#sat-grad)" opacity="0.8" d="m27 25 15 15H27l-7-7 7-8Z"/><path fill="url(#sat-grad)" opacity="0.6" d="m20 33 7-8 15 15H27l-7-7Z"/></svg>',
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    category: 'Mobile',
    level: '2',
    iconSvg:
      '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sat-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--btn-primary-bg)"/><stop offset="100%" stop-color="var(--btn-primary-text)"/></linearGradient></defs><path fill="url(#sat-grad)" d="M5 5h38L5 43h38V5H5Z"/></svg>',
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'Design',
    level: '4',
    iconSvg:
      '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sat-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--btn-primary-bg)"/><stop offset="100%" stop-color="var(--btn-primary-text)"/></linearGradient></defs><g fill="url(#sat-grad)"><path d="M16 4h8v13h-8a6.5 6.5 0 1 1 0-13Z"/><path d="M24 4h8a6.5 6.5 0 1 1 0 13h-8V4Z"/><path d="M16 17h8v13h-8a6.5 6.5 0 1 1 0-13Z"/><circle cx="30.5" cy="23.5" r="6.5"/><path d="M16 30h8v7a6.5 6.5 0 1 1-8-6.3V30Z"/></g></svg>',
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'Cloud',
    level: '3',
    iconSvg:
      '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sat-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--btn-primary-bg)"/><stop offset="100%" stop-color="var(--btn-primary-text)"/></linearGradient></defs><path stroke="url(#sat-grad)" stroke-width="3" stroke-linecap="round" fill="none" d="M13 31H9a7 7 0 0 1 0-14c1-7 7-11 13-9 4 1 6 4 7 8h3a6 6 0 0 1 0 12h-4"/><path stroke="url(#sat-grad)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" d="M11 37c9 5 18 5 27 0M34 34l5 3-2 5"/></svg>',
  },
];
const ORBIT_CONFIG: readonly OrbitConfig[] = [
  { scale: 0.82, rotateX: 68, rotateY: -12, rotateZ: -18, duration: 44, reverse: false },
  { scale: 0.91, rotateX: 68, rotateY: 12, rotateZ: 18, duration: 36, reverse: true },
  { scale: 1, rotateX: 66, rotateY: 0, rotateZ: 0, duration: 28, reverse: false },
];

@Component({
  selector: 'app-tech-orbit',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tech-orbit.html',
  styleUrl: './tech-orbit.css',
})
export class TechOrbit {
  private readonly sanitizer = inject(DomSanitizer);

  readonly technologies = input<readonly Technology[]>(DEFAULT_TECHNOLOGIES);
  readonly label = input('Ecosistema tecnológico');
  readonly guide = input('');
  readonly guide2 = input('');
  readonly hoveredTechnologyId = signal<string | null>(null);
  readonly selectedTechnologyId = signal<string | null>(null);
  readonly stageHovered = signal(false);

  readonly activeTechnologyId = computed(
    () => this.hoveredTechnologyId() ?? this.selectedTechnologyId(),
  );
  readonly paused = computed(() => this.stageHovered() || this.activeTechnologyId() !== null);
  readonly selectedTechnology = computed(
    () => this.technologies().find((t) => t.id === this.selectedTechnologyId()) ?? null,
  );

  readonly orbits = computed<readonly TechnologyOrbit[]>(() => {
    const techs = this.technologies();
    const groups: Technology[][] = ORBIT_CONFIG.map(() => []);

    techs.forEach((tech, index) => {
      groups[index % groups.length].push(tech);
    });

    return ORBIT_CONFIG.map((config, index) => ({
      ...config,
      index,
      technologies: groups[index].map((technology, itemIndex, items) => ({
        technology,
        icon: this.sanitizer.bypassSecurityTrustHtml(technology.iconSvg),
        delay: -(itemIndex / items.length) * config.duration,
      })),
    }));
  });

  toggleTechnology(id: string): void {
    this.selectedTechnologyId.update((selectedId) => (selectedId === id ? null : id));
  }
}
