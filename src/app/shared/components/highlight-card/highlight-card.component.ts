import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-highlight-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './highlight-card.component.html',
  styleUrl: './highlight-card.component.css',
})
export class HighlightCardComponent {
  number = input.required<string>();
  title = input.required<string>();
  description = input.required<string>();
}
