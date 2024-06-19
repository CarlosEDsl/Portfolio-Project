import { Component, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../shared/services/projects.service';
import { FormComponent } from '../../shared/components/form/form.component';
import { Project } from '../../shared/interfaces/projecttInterface';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  matSnackBar = inject(MatSnackBar)
  router = inject(Router);
  projectsService = inject(ProjectsService);
  project = inject(ActivatedRoute).snapshot.data['project'];
  

  onSubmit(project:Project) {
    this.projectsService.put({
      id: this.project.id,
      title: project.title,
      shortDesc: project.shortDesc,
      description: project.description,
      url: project.url,
      img: project.img
    })
    .subscribe(() => {
      this.matSnackBar.open("Atualizado com sucesso", "") as MatSnackBarConfig;
      this.router.navigateByUrl("/").catch(() => console.log("Erro na rota"));
    });
  }

}
