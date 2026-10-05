import { Component, input } from '@angular/core';

@Component({
  selector: 'app-divider',
  standalone: true,
  template: `
    <div
      class="flex w-full items-center justify-center gap-3 my-8"
      [class]="customClass()"
      role="separator"
      aria-orientation="horizontal"
    >
      <span class="h-px flex-1 bg-[var(--border-subtle,rgba(215,221,234,0.2))]"></span>

      <span
        class="h-2.5 w-2.5 rotate-45 rounded-[2px] border border-[var(--border-subtle,rgba(215,221,234,0.4))] bg-transparent"
      ></span>

      <span class="h-px flex-1 bg-[var(--border-subtle,rgba(215,221,234,0.2))]"></span>
    </div>
  `,
})
export class DividerComponent {
  customClass = input<string>('');
}
