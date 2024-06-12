import { Project } from './../../../../shared/interfaces/projecttInterface';
import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  project = input.required<Project>();

  projectTitle = computed(() => this.project().title);
  projectShortDesc = computed(() => this.project().shortDesc);
  projectDesc = computed(() => this.project().description);
  projectURL = computed(() => this.project().url);
  projectIMG = computed(() => this.project().img);

}
