import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component'
import { inject } from '@angular/core';
import { ProjectsService } from './shared/services/projects.service';

export const routes: Routes = [
  {
  path: '',
  component: ListComponent
},
{
  path: 'input-project',
  loadComponent: () => 
    import('./features/create/create.component') 
  .then(m => m.CreateComponent)
},
{
  path:'edit-project/:id',
  resolve : {
    project: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      const projectService = inject(ProjectsService);
      return projectService.get(route.paramMap.get('id') as string);
    }
  },
  loadComponent: () => 
    import('./features/edit/edit.component')
  .then(m => m.EditComponent)
}
];
