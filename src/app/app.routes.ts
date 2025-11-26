// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { prerender: false } },
  { path: 'projects', component: ProjectsPageComponent, data: { prerender: false } },
  { path: '**', redirectTo: '' }
];
