import { Component, computed, input, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { StackPillComponent } from '../stack-pill/stack-pill.component';

export interface experienceTechnology {
  labelKey: string;
  iconUrl?: string;
}

@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [StackPillComponent, TranslatePipe],
  templateUrl: './experience-card.component.html',
  styleUrl: './experience-card.component.css',
})
export class experienceCardComponent {
  title = input.required<string>();
  description = input.required<string>();
  descriptionId = input.required<string>();
  technologies = input<readonly experienceTechnology[]>([]);
  techTags = input<readonly experienceTechnology[] | undefined>();
  date = input<string | undefined>();
  compact = input(false);
  category = input<string | undefined>();
  categoryIconUrl = input<string | undefined>();

  readonly descriptionExpanded = signal(false);
  readonly displayedTechTags = computed(() => this.techTags() ?? this.technologies());

  toggleDescription(): void {
    this.descriptionExpanded.update((expanded) => !expanded);
  }
}
