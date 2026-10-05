import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stack-pill',
  standalone: true,
  templateUrl: './stack-pill.component.html',
  styleUrl: './stack-pill.component.css',
})
export class StackPillComponent {
  label = input.required<string>();
  iconUrl = input<string | undefined>();
}
