import { Component, input } from '@angular/core';
import { StackPillComponent } from '../stack-pill/stack-pill.component';

export interface ProjectTechnology {
  label: string;
  iconUrl?: string;
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [StackPillComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
})
export class ProjectCardComponent {
  title = input.required<string>();
  description = input.required<string>();
  technologies = input<ProjectTechnology[]>([]);
  category = input<string | undefined>();
  categoryIconUrl = input<string | undefined>();
}
