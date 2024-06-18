import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../shared/services/projects.service'
import { Project } from '../../shared/interfaces/projecttInterface';
import { CardComponent } from './components/card/card.component'
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  projects: Project[] = [];

  httpClient = inject(ProjectsService);
  router = inject(Router);

  ngOnInit() {

    this.httpClient.getAll().subscribe((projects) => {
      this.projects = projects;
    })
  }

  onEdit(project: Project) {
    this.router.navigate(['/edit-project', project.id])
  }

}
