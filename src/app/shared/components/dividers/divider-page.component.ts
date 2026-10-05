import { Component, input } from '@angular/core';

@Component({
  selector: 'app-dots-divider',
  standalone: true,
  template: `
    <div
      class="flex w-full items-center justify-center gap-3 my-8"
      [class]="customClass()"
      role="separator"
      aria-orientation="horizontal"
    >
      <span class="h-px flex-1 bg-[var(--border-subtle,currentColor)] opacity-35"></span>

      <div class="flex items-center gap-1.5 text-[var(--text-secondary,currentColor)]">
        <span class="h-1.5 w-1.5 rounded-full bg-current"></span>

        <span class="h-2 w-2 rounded-full bg-current"></span>

        <span class="h-1.5 w-1.5 rounded-full bg-current"></span>
      </div>

      <span class="h-px flex-1 bg-[var(--border-subtle,currentColor)] opacity-35"></span>
    </div>
  `,
})
export class DotsDividerComponent {
  customClass = input<string>('');
}
