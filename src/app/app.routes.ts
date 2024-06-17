import { Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component'

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
  path:'edit-project',
  loadChildren: () => 
    import('./features/edit/edit.component')
  .then(m => m.EditComponent)
}
];
