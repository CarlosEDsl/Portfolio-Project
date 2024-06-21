import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ProjectsService } from '../../shared/services/projects.service'
import { Project } from '../../shared/interfaces/projecttInterface';
import { CardComponent } from './components/card/card.component'
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { filter } from 'rxjs';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  projects:any = signal<Project[]>(inject(ActivatedRoute).snapshot.data['projects']);

  httpClient = inject(ProjectsService);
  router = inject(Router);
  matDialog = inject(MatDialog)
  confirmationService = inject (ConfirmationDialogService)

  onEdit(project: Project) {
    this.router.navigate(['/edit-project', project.id])
  }

  onDelete(project: Project) {
    this.confirmationService.openDialog()
      .pipe(filter((ans) => ans === true))
      .subscribe(() => {
          this.httpClient.delete(project.id).subscribe(() => {
            this.httpClient.getAll().subscribe((projects) => {
              this.projects.set(projects);
            });
          });
      });
  };

}
