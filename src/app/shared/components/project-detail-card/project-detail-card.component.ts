import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { StackPillComponent } from '../stack-pill/stack-pill.component';

export interface ProjectTechnology {
  readonly labelKey: string;
  readonly iconUrl?: string;
}

@Component({
  selector: 'app-project-detail-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, StackPillComponent, TranslatePipe],
  templateUrl: './project-detail-card.component.html',
  styleUrl: './project-detail-card.component.css',
})
export class ProjectDetailCardComponent {
  title = input.required<string>();
  description = input.required<string>();
  technologies = input<readonly ProjectTechnology[]>([]);
  imageUrl = input<string | undefined>();
  videoUrl = input<string | undefined>();
  imageAlt = input<string | undefined>();
  projectUrl = input<string | null | undefined>();
  designUrl = input<string | null | undefined>();
}
