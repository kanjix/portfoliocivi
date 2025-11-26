// src/components/project-card/project-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [NgIf],  // Импортируем директиву NgIf для использования в шаблоне
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() project!: Project;  // Получаем проект через Input
  @Output() open = new EventEmitter<Project>();
}
