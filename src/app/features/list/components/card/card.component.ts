import { Project } from './../../../../shared/interfaces/projecttInterface';
import { Component, EventEmitter, Output, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  project = input.required<Project>();

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  projectTitle = computed(() => this.project().title);
  projectShortDesc = computed(() => this.project().shortDesc);
  projectDesc = computed(() => this.project().description);
  projectURL = computed(() => this.project().url);
  projectIMG = computed(() => this.project().img);

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }

}
