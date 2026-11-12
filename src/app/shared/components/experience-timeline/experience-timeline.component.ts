import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  experienceCardComponent,
  experienceTechnology,
} from '../experience-card/experience-card.component';

interface ExperienceProject {
  readonly id: string;
  readonly year: number;
  readonly titleKey: string;
  readonly subtitleKey: string;
  readonly descriptionKey: string;
  readonly techTags: readonly experienceTechnology[];
}

interface ExperienceInterval {
  readonly id: string;
  readonly period: string;
  readonly startYear: number;
  readonly endYear: number;
}

@Component({
  selector: 'app-experience-timeline',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, experienceCardComponent],
  templateUrl: './experience-timeline.component.html',
  styleUrl: './experience-timeline.component.css',
})
export class ExperienceTimelineComponent {
  readonly intervals: readonly ExperienceInterval[] = [
    {
      id: 'int-1',
      period: '2023 - 2024',
      startYear: 2023,
      endYear: 2024,
    },
    {
      id: 'int-2',
      period: '2024 - 2025',
      startYear: 2024,
      endYear: 2025,
    },
    {
      id: 'int-3',
      period: '2025 - 2026',
      startYear: 2025,
      endYear: 2026,
    },
  ];

  readonly projects: readonly ExperienceProject[] = [
    {
      id: 'internship',
      year: 2023,
      titleKey: 'sections.experience.milestones.internship.title',
      subtitleKey: 'sections.experience.milestones.internship.subtitle',
      descriptionKey: 'sections.experience.milestones.internship.description1',
      techTags: [
        { labelKey: 'labels.bim', iconUrl: 'assets/icons/tech/bim.svg' },
        { labelKey: 'labels.documentation', iconUrl: 'assets/icons/tech/doc.svg' },
        { labelKey: 'labels.mic365', iconUrl: 'assets/icons/tech/microsoft.svg' },
      ],
    },
    {
      id: 'internship2',
      year: 2025,
      titleKey: 'sections.experience.milestones.internship.title',
      subtitleKey: 'sections.experience.milestones.internship.subtitle2',
      descriptionKey: 'sections.experience.milestones.internship.description2',
      techTags: [
        { labelKey: 'labels.webDev' },
        { labelKey: 'labels.branding' },
        { labelKey: 'labels.vue', iconUrl: 'assets/icons/tech/vue.svg' },
        { labelKey: 'labels.node', iconUrl: 'assets/icons/tech/node.svg' },
        { labelKey: 'labels.aws', iconUrl: 'assets/icons/tech/aws.svg' },
      ],
    },
    {
      id: 'ux-ui',
      year: 2024,
      titleKey: 'sections.experience.milestones.ux_ui.title',
      subtitleKey: 'sections.experience.milestones.ux_ui.subtitle',
      descriptionKey: 'sections.experience.milestones.ux_ui.description',
      techTags: [
        { labelKey: 'labels.figma', iconUrl: 'assets/icons/tech/figma.svg' },
        { labelKey: 'labels.uxui' },
        { labelKey: 'labels.wcag' },
        { labelKey: 'labels.canva', iconUrl: 'assets/icons/tech/canva.svg' },
      ],
    },
    {
      id: 'fullstack',
      year: 2025,
      titleKey: 'sections.experience.milestones.fullstack.title',
      subtitleKey: 'sections.experience.milestones.fullstack.subtitle',
      descriptionKey: 'sections.experience.milestones.fullstack.description',
      techTags: [
        { labelKey: 'labels.vue', iconUrl: 'assets/icons/tech/vue.svg' },
        { labelKey: 'labels.node', iconUrl: 'assets/icons/tech/node.svg' },
        { labelKey: 'labels.aws', iconUrl: 'assets/icons/tech/aws.svg' },
        { labelKey: 'labels.flutter', iconUrl: 'assets/icons/tech/flutter.svg' },
      ],
    },
    {
      id: 'fondecyt',
      year: 2026,
      titleKey: 'sections.experience.milestones.fondecyt.title',
      subtitleKey: 'sections.experience.milestones.fondecyt.subtitle',
      descriptionKey: 'sections.experience.milestones.fondecyt.description',
      techTags: [
        { labelKey: 'labels.kanban' },
        { labelKey: 'labels.microservices' },
        { labelKey: 'labels.projectManagement' },
      ],
    },
  ];

  // Estado del intervalo seleccionado (por defecto el primero)
  readonly selectedId = signal<string>(this.intervals[0].id);

  readonly activeInterval = computed(
    () => this.intervals.find((i) => i.id === this.selectedId()) ?? this.intervals[0],
  );

  readonly activeProjects = computed(() => {
    const interval = this.activeInterval();
    return this.projects.filter(
      (project) => project.year >= interval.startYear && project.year <= interval.endYear,
    );
  });

  selectInterval(id: string): void {
    this.selectedId.set(id);
  }
}
