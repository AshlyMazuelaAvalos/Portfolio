import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

@Component({
  selector: 'app-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  ariaLabel = input<string>('');

  // Evento de clic
  btnClick = output<MouseEvent>();

  handleClick(event: MouseEvent): void {
    if (!this.disabled()) {
      this.btnClick.emit(event);
    }
  }
}
