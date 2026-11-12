import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-stack-pill',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './stack-pill.component.html',
  styleUrl: './stack-pill.component.css',
})
export class StackPillComponent {
  label = input.required<string>();
  iconUrl = input<string | undefined>();
}
