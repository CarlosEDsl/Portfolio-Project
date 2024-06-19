import { Component, EventEmitter, Output, input, output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Project } from '../../interfaces/projecttInterface';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  project = input<Project | null>(null);

  form!: FormGroup;
  @Output() send = new EventEmitter<Project>();

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl<string>(this.project()?.title ?? '', {
        nonNullable: true,
        validators: Validators.required
      }),
      shortDesc: new FormControl<string>(this.project()?.shortDesc ?? '', {
        nonNullable: false,
        validators: Validators.maxLength(60)
      }),
      description: new FormControl<string>(this.project()?.description ?? '', {
        nonNullable: false,
        validators: Validators.maxLength(200)
      }),
      url: new FormControl<string>(this.project()?.url ?? '', {
        nonNullable: true,
        validators: Validators.required
      }),
      img: new FormControl<string>(this.project()?.img ?? '', {
        nonNullable: false,
      })
    });
  }

  onSubmit() {
    this.send.emit(this.form.value as Project)
  }

}
