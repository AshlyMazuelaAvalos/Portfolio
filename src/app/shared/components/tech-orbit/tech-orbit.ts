import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

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
export class TechOrbit {
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
        delay: -(itemIndex / items.length) * config.duration,
      })),
    }));
  });

  toggleTechnology(id: string): void {
    this.selectedTechnologyId.update((selectedId) => (selectedId === id ? null : id));
  }
}
