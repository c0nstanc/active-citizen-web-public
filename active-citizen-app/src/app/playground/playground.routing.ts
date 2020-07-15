import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PlaygroundPageComponent } from './component/playground-page/playground-page.component';


export const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    component: PlaygroundPageComponent,
    children: [
      {
        path: '**',
        redirectTo: '',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaygroundRoutes { }
