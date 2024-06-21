import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../shared/services/projects.service'
import { Project } from '../../shared/interfaces/projecttInterface';
import { CardComponent } from './components/card/card.component'
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatDialogRef } from '@angular/material/dialog'
import { filter } from 'rxjs';

@Component({
  selector: 'app-delete-confirmation-dialog',
  template: `
  <h2 mat-dialog-title>Deleção de projeto</h2>
  <mat-dialog-content>
    Você deseja apagar este projeto?
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close cdkFocusInitial color="accent" (click)="onYes()">Sim</button>
    <button mat-button mat-dialog-close (click)="onNo()">Não</button>
  </mat-dialog-actions>`,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class ConfirmationDialogComponent {
  matDialogRef = inject(MatDialogRef)
  onNo() {
    this.matDialogRef.close(false);
  }
  onYes() {
    this.matDialogRef.close(true);
  }
}



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
    this.matDialog
      .open(ConfirmationDialogComponent)
      .afterClosed()
      .pipe(filter((answ:boolean) => answ === true))
      .subscribe(() => {
          this.httpClient.delete(project.id).subscribe(() => {
            this.ngOnInit();
          });
      });
  };

}
