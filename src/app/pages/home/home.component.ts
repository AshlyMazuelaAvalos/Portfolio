import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  title = 'Portfolio';
  greeting = 'Hola, soy Ashly';
  subtitle = 'Desarrolladora Frontend';
  ctaText = 'Ver proyectos';

  stats = [
    { label: 'Proyectos', value: '12+' },
    { label: 'Años de experiencia', value: '3' },
    { label: 'Tecnologías', value: '8+' },
  ];
}
