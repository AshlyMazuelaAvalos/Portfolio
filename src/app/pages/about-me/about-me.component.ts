import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { DividerComponent } from '../../shared/components/dividers/divider.component';
import { HighlightCardComponent } from '../../shared/components/highlight-card/highlight-card.component';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [TranslatePipe, DividerComponent, HighlightCardComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
})
export class AboutMeComponent {}
