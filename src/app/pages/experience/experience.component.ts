import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ExperienceTimelineComponent } from '../../shared/components/experience-timeline/experience-timeline.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, TranslatePipe, ExperienceTimelineComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
})
export class ExperienceComponent {}
