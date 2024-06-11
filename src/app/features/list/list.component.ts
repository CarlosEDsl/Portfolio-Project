import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../shared/services/projects.service'
import { Project } from '../../shared/interfaces/projecttInterface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  projects: Project[] = [];

  httpClient = inject(ProjectsService);

  ngOnInit() {

    this.httpClient.getAll().subscribe((projects) => {
      this.projects = projects;
    })
  }

}
