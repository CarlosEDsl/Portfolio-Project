import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Project } from '../interfaces/projecttInterface';
import { ProductPayload } from '../interfaces/payload-product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  projects: Project[] = [];

  httpClient = inject(HttpClient);

  getAll() {
    return this.httpClient.get<Project[]>('/api/projects')
  }

  get(id:string) {
    return this.httpClient.get<Project>(`/api/projects/${id}`)
  }

  post(payload:ProductPayload) {
    return this.httpClient.post('/api/projects', payload);
  }

  put(project:Project) {
    return this.httpClient.put(`/api/projects/${project.id}`, project);
  }
  delete(id:string) {
    return this.httpClient.delete(`/api/projects/${id}`)
  }

}
