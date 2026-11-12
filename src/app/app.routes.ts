import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((module) => module.HomeComponent),
  },
  {
    path: 'about-me',
    loadComponent: () => import('./pages/home/home.component').then((module) => module.HomeComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((module) => module.NotFoundComponent),
  },
];
