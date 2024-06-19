import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../../shared/services/projects.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'
import { Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form/form.component';
import { Project } from '../../shared/interfaces/projecttInterface';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})

export class CreateComponent {

  matSnackBar = inject(MatSnackBar)
  router = inject(Router);
  projectsService = inject(ProjectsService);

  onSubmit(project: Project) {
    this.projectsService
    .post(project)
    .subscribe(() => {
      this.matSnackBar.open("Cadastrado com sucesso", "") as MatSnackBarConfig;
      this.router.navigateByUrl("/").catch(() => console.log("Erro na rota"));
    });
  }
}
