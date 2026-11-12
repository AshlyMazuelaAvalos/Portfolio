import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TechOrbit } from '../../shared/components/tech-orbit/tech-orbit';

@Component({
  selector: 'app-stack',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, TechOrbit],
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.css',
})
export class StackComponent {}
