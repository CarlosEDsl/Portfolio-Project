import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProjectsService } from '../../shared/services/projects.service';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})

export class CreateComponent {

  matSnackBar = inject(MatSnackBar)
  router = inject(Router);
  projectsService = inject(ProjectsService);

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
    this.projectsService.post({
      title: this.form.controls.title.value,
      shortDesc: this.form.controls.shortDesc.value,
      description: this.form.controls.description.value,
      url: this.form.controls.url.value,
      img: this.form.controls.img.value
    })
    .subscribe(() => {
      alert("Success");
    });
    this.matSnackBar.open("Cadastrado com sucesso", "", {
      duration:3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
    this.router.navigateByUrl("/").catch(() => console.log("Erro na rota"));
  }

}
