import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ExperienceTimelineComponent } from '../../shared/components/experience-timeline/experience-timeline.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [TranslatePipe, ExperienceTimelineComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
})
export class ExperienceComponent {}
