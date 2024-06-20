import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../shared/services/projects.service'
import { Project } from '../../shared/interfaces/projecttInterface';
import { CardComponent } from './components/card/card.component'
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { ChangeDetectionStrategy } from '@angular/compiler';

@Component({
  selector: 'app-delete-confirmation-dialog',
  template: `
  <h2 mat-dialog-title>Deleção de projeto</h2>
  <mat-dialog-content>
    Você deseja apagar este projeto?
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close cdkFocusInitial>Sim</button>
    <button mat-button mat-dialog-close>Não</button>
  </mat-dialog-actions>`,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class ConfirmationDialogComponent {}



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
  matDialog = inject(MatDialog)

  ngOnInit() {

    this.httpClient.getAll().subscribe((projects) => {
      this.projects = projects;
    })
  }

  onEdit(project: Project) {
    this.router.navigate(['/edit-project', project.id])
  }

  onDelete(project: Project) {
    this.matDialog.open(ConfirmationDialogComponent)
      .afterClosed()
      .subscribe((data) => {
        console.log('afterClosed' + data);
      })
  }

}
