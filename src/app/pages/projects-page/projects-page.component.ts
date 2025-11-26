// src/components/projects-page/projects-page.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';  // Импортируем CommonModule для работы с директивами
import { ProjectsService } from '../../services/projects.service'; // Сервис для проектов
import { ProjectCardComponent } from '../../components/project-card/project-card.component'; // Импортируем компонент карточки
import { ProjectModalComponent } from '../../components/project-modal/project-modal.component';
import { Project } from '../../models/project.model';  // Модель проекта

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, ProjectModalComponent],  // Импортируем необходимые компоненты
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit {
  projects = signal<Project[]>([]);  // Массив для хранения проектов
  isLoading = signal(true);  // Индикатор загрузки данных
  selectedProject = signal<Project | undefined>(undefined);

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    // Загружаем данные при инициализации компонента
    this.projectsService.getProjects().subscribe({
      next: (data) => {
        this.projects.set(data);
        this.isLoading.set(false);  // Данные загружены, скрываем индикатор загрузки
      },
      error: (err) => {
        console.error('Ошибка загрузки проектов:', err);
        this.isLoading.set(false);  // В случае ошибки также скрываем индикатор
      }
    });
  }
}
  