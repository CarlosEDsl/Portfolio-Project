import { Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component'
import { getProjects } from './shared/components/resolvers/get-projects.resolver';
import { getProject } from './shared/components/resolvers/get-project.resolver';

export const routes: Routes = [
  {
  path: '',
  resolve: {
    projects: getProjects
  },
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
    project: getProject
  },
  loadComponent: () => 
    import('./features/edit/edit.component')
  .then(m => m.EditComponent)
}
];
