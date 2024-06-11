import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  projects: any[] = [];

  httpClient = inject(HttpClient);

  ngOnInit() {

    this.httpClient.get<any>('/api/projects').subscribe((projects) => {
      this.projects = projects;
    })
  }

}
