import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundPageComponent } from './component/playground-page/playground-page.component';
import { PlaygroundRoutes } from './playground.routing';



@NgModule({
  declarations: [PlaygroundPageComponent],
  imports: [
    CommonModule,
    PlaygroundRoutes
  ]
})
export class PlaygroundModule { }
