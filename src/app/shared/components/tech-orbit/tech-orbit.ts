import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  PLATFORM_ID,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface Technology {
  readonly id: string;
  readonly name: string;
  readonly iconUrl: string;
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
    iconUrl: 'assets/icons/tech/angular.svg',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Frontend',
    level: '3',
    iconUrl: 'assets/icons/tech/typescript.svg',
  },
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    level: '2',
    iconUrl: 'assets/icons/tech/react.svg',
  },
  {
    id: 'node',
    name: 'Node.js',
    category: 'Backend',
    level: '4',
    iconUrl: 'assets/icons/tech/node.svg',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Backend and Analytics',
    level: '4',
    iconUrl: 'assets/icons/tech/python.svg',
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'DevOps',
    level: '2',
    iconUrl: 'assets/icons/tech/docker.svg',
  },
  {
    id: 'vue',
    name: 'Vue 3',
    category: 'Frontend',
    level: '4',
    iconUrl: 'assets/icons/tech/vue.svg',
  },
  {
    id: 'nestjs',
    name: 'NestJS',
    category: 'Backend',
    level: '2',
    iconUrl: 'assets/icons/tech/nest.svg',
  },
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'Mobile',
    level: '4',
    iconUrl: 'assets/icons/tech/flutter.svg',
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    category: 'Mobile',
    level: '2',
    iconUrl: 'assets/icons/tech/kotlin.svg',
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'Design',
    level: '4',
    iconUrl: 'assets/icons/tech/figma.svg',
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'Cloud',
    level: '3',
    iconUrl: 'assets/icons/tech/aws.svg',
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
export class TechOrbit implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private visibilityObserver: IntersectionObserver | null = null;
  private tooltipShowTimer: ReturnType<typeof setTimeout> | null = null;
  private tooltipHideTimer: ReturnType<typeof setTimeout> | null = null;

  readonly technologies = input<readonly Technology[]>(DEFAULT_TECHNOLOGIES);
  readonly label = input('Ecosistema tecnológico');
  readonly guide = input('');
  readonly guide2 = input('');
  readonly hoveredTechnologyId = signal<string | null>(null);
  readonly selectedTechnologyId = signal<string | null>(null);
  readonly initialBubbleTooltipVisible = signal(false);

  readonly activeTechnologyId = computed(
    () => this.hoveredTechnologyId() ?? this.selectedTechnologyId(),
  );
  readonly paused = computed(() => this.activeTechnologyId() !== null);
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
        delay: -(itemIndex / items.length) * config.duration,
      })),
    }));
  });

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.visibilityObserver?.disconnect();
          this.tooltipShowTimer = setTimeout(() => {
            this.initialBubbleTooltipVisible.set(true);
            this.tooltipHideTimer = setTimeout(
              () => this.initialBubbleTooltipVisible.set(false),
              4500,
            );
          }, 300);
        }
      },
      { threshold: 0.25 },
    );
    this.visibilityObserver.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.visibilityObserver?.disconnect();
    this.clearInitialTooltipTimers();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    this.dismissInitialBubbleTooltip();

    if (!(event.target instanceof Element) || !event.target.closest('.satellite-button')) {
      this.selectedTechnologyId.set(null);
    }
  }

  toggleTechnology(id: string): void {
    this.selectedTechnologyId.update((selectedId) => (selectedId === id ? null : id));
  }

  dismissInitialBubbleTooltip(): void {
    this.initialBubbleTooltipVisible.set(false);
    this.clearInitialTooltipTimers();
  }

  private clearInitialTooltipTimers(): void {
    if (this.tooltipShowTimer !== null) {
      clearTimeout(this.tooltipShowTimer);
      this.tooltipShowTimer = null;
    }
    if (this.tooltipHideTimer !== null) {
      clearTimeout(this.tooltipHideTimer);
      this.tooltipHideTimer = null;
    }
  }
}
