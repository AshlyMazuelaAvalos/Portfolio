import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  ProjectDetailCardComponent,
  type ProjectTechnology,
} from '../../shared/components/project-detail-card/project-detail-card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectDetailCardComponent, TranslatePipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  readonly featuredProjects: readonly {
    titleKey: string;
    descriptionKey: string;
    projectUrl?: string | null;
    designUrl?: string | null;
    imageUrl?: string;
    videoUrl?: string;
    technologies: readonly ProjectTechnology[];
  }[] = [
    {
      imageUrl: 'assets/images/projects/AgileFlow/agileflow.png',
      titleKey: 'sections.projects.projects.agileflow.title',
      descriptionKey: 'sections.projects.projects.agileflow.description',
      projectUrl: 'https://github.com/AshlyMazuelaAvalos/audio-analysis',
      technologies: [
        { labelKey: 'labels.education' },
        { labelKey: 'labels.dataScience' },
        { labelKey: 'labels.projectManagement' },
        { labelKey: 'labels.kanban' },
        { labelKey: 'labels.python', iconUrl: 'assets/icons/tech/python.svg' },
      ],
    },
    {
      imageUrl: 'assets/images/projects/portfolio.png',
      titleKey: 'sections.projects.projects.portfolio.title',
      descriptionKey: 'sections.projects.projects.portfolio.description',
      projectUrl: 'https://github.com/AshlyMazuelaAvalos/Portfolio',
      designUrl:
        'https://www.figma.com/design/qWKh9fXTeVbQkYUKafbsI5/Portafolio?node-id=2122-154&t=RmR81A59HU8G0Loa-0',
      technologies: [
        { labelKey: 'labels.figma', iconUrl: 'assets/icons/tech/figma.svg' },
        { labelKey: 'labels.angular', iconUrl: 'assets/icons/tech/angular.svg' },
        { labelKey: 'labels.typescript', iconUrl: 'assets/icons/tech/typescript.svg' },
        { labelKey: 'labels.tailwind', iconUrl: 'assets/icons/tech/tailwind.svg' },
      ],
    },
    {
      imageUrl: 'assets/images/projects/Turin/Turin.png',
      titleKey: 'sections.projects.projects.turin.title',
      descriptionKey: 'sections.projects.projects.turin.description',
      designUrl:
        'https://www.figma.com/design/nPkzP7yxrpgAnmz65t94yT/turin?node-id=0-1&t=RmR81A59HU8G0Loa-1',
      technologies: [
        { labelKey: 'labels.figma', iconUrl: 'assets/icons/tech/figma.svg' },
        { labelKey: 'labels.flutter', iconUrl: 'assets/icons/tech/flutter.svg' },
        { labelKey: 'labels.aws', iconUrl: 'assets/icons/tech/aws.svg' },
      ],
    },
    {
      videoUrl: 'assets/images/videos/elizasmemories/elizasmemoriesdemo.mp4',
      titleKey: 'sections.projects.projects.elizasmemories.title',
      descriptionKey: 'sections.projects.projects.elizasmemories.description',
      projectUrl: 'https://github.com/AshlyMazuelaAvalos/ElizasMemories',
      technologies: [{ labelKey: 'RPG Maker MZ' }, { labelKey: 'labels.education' }],
    },
    /*{
      imageUrl: 'assets/images/projects/AIAlpha/IAAlphapage.png',
      titleKey: 'sections.projects.projects.aialphaanalytics.title',
      descriptionKey: 'sections.projects.projects.aialphaanalytics.description',
      projectUrl: 'https://www.aialphaanalytics.com',
      technologies: [
        { labelKey: 'labels.branding' },
        { labelKey: 'labels.vue', iconUrl: 'assets/icons/tech/vue.svg' },
        { labelKey: 'labels.sass', iconUrl: 'assets/icons/tech/sass.svg' },
        { labelKey: 'labels.node', iconUrl: 'assets/icons/tech/node.svg' },
        { labelKey: 'labels.aws', iconUrl: 'assets/icons/tech/aws.svg' },
      ],
    },
  {
      imageUrl: 'assets/images/projects/Svalinn/Svalinncard.png',
      titleKey: 'sections.projects.projects.svalinn.title',
      descriptionKey: 'sections.projects.projects.svalinn.description',
      projectUrl: 'https://svalinncybersecurity.com',
      technologies: [
        { labelKey: 'labels.vue', iconUrl: 'assets/icons/tech/vue.svg' },
        { labelKey: 'labels.sass', iconUrl: 'assets/icons/tech/sass.svg' },
        { labelKey: 'labels.node', iconUrl: 'assets/icons/tech/node.svg' },
        { labelKey: 'labels.aws', iconUrl: 'assets/icons/tech/aws.svg' },
      ],
    },*/
  ];
}
