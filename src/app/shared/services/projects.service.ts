import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Project } from '../interfaces/projecttInterface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  projects: Project[] = [];

  httpClient = inject(HttpClient);

  getAll() {
    return this.httpClient.get<Project[]>('/api/projects')
  }
}
