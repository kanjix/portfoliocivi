// src/services/projects.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private apiUrl = 'assets/db/projects.json';  // Путь к локальному JSON файлу

  constructor(private http: HttpClient) {}

  // Метод для получения проектов
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }
}
