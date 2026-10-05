import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { StackPillComponent } from '../../shared/components/stack-pill/stack-pill.component';

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [TranslatePipe, StackPillComponent],
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.css',
})
export class StackComponent {
  readonly technologies = [
    'Angular',
    'React',
    'Vue 3',
    'TypeScript',
    'Node.js',
    'NestJS',
    'Python',
    'Flutter',
    'Kotlin',
    'AWS',
    'Docker',
    'Figma',
  ];
}
