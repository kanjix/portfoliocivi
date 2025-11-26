// src/app/components/home/home.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectsService } from '../../services/projects.service';
import { NgIf, NgForOf, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectModalComponent } from '../../components/project-modal/project-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgForOf, NgStyle, RouterLink, ProjectModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  topProjects = signal<Project[]>([]);
  loading = signal(true);
  currentIndex = signal(0);
  selectedProject = signal<Project | undefined>(undefined);

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    // Загружаем проекты через сервис
    this.projectsService.getProjects().subscribe({
      next: (projects: Project[]) => {
        // Берём первые 4-5 проектов для обзора
        const filtered = projects.slice(0, 5);
        this.topProjects.set(filtered);
        this.loading.set(false);
        console.log('Loaded projects:', filtered);
      },
      error: (err: any) => {
        console.error('Projects load error:', err);
        this.loading.set(false);
      },
    });
  }

  nextProject(): void {
    const projects = this.topProjects();
    if (!projects.length) return;
    this.currentIndex.set((this.currentIndex() + 1) % projects.length);
  }

  prevProject(): void {
    const projects = this.topProjects();
    if (!projects.length) return;
    this.currentIndex.set(
      (this.currentIndex() - 1 + projects.length) % projects.length,
    );
  }

  getCardStyle(index: number): { [key: string]: string | number } {
    const total = this.topProjects().length;
    if (!total) return {};

    let offset = index - this.currentIndex();

    // Чтобы соседние карточки не прыгали через всю стопку
    if (offset > total / 2) {
      offset -= total;
    } else if (offset < -total / 2) {
      offset += total;
    }

    const depth = Math.abs(offset);
    const translateX = offset * 26; // Расстояние между карточками
    const translateY = depth * 10;
    const scale = 1 - depth * 0.06;
    const rotate = offset * 2; // Лёгкий поворот
    const opacity = depth > 2 ? 0 : 1 - depth * 0.15;
    const zIndex = 10 - depth;

    return {
      transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
      opacity: opacity.toString(),
      zIndex: zIndex,
    };
  }
}
