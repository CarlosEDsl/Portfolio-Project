import { Component, Injectable, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Observable, filter } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor() { }

  matDialog = inject(MatDialog);

  openDialog():Observable<boolean> {

    return this.matDialog
      .open(ConfirmationDialogComponent)
      .afterClosed()
  };
}
