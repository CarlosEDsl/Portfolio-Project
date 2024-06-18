import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../shared/services/projects.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  matSnackBar = inject(MatSnackBar)
  router = inject(Router);
  projectsService = inject(ProjectsService);
  project = inject(ActivatedRoute).snapshot.data['project'];
  
  form = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required
    }),
    shortDesc: new FormControl<string>('', {
      nonNullable: false,
      validators: Validators.maxLength(60)
    }),
    description: new FormControl<string>('', {
      nonNullable: false,
      validators: Validators.maxLength(200)
    }),
    url: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required
    }),
    img: new FormControl<string>('', {
      nonNullable: false,
    })
  });

  onSubmit() {
    this.projectsService.put({
      id: this.project.id,
      title: this.form.controls.title.value,
      shortDesc: this.form.controls.shortDesc.value,
      description: this.form.controls.description.value,
      url: this.form.controls.url.value,
      img: this.form.controls.img.value
    })
    .subscribe(() => {
      this.matSnackBar.open("Atualizado com sucesso", "") as MatSnackBarConfig;
      this.router.navigateByUrl("/").catch(() => console.log("Erro na rota"));
    });
  }

}
