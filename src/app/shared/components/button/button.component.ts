import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  // Inputs usando signals modernas de Angular
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
