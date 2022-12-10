import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovimentarObjetoComponent } from './movimentar-objeto/movimentar-objeto.component';
import { SceneComponent } from './scene/scene.component';

const routes: Routes = [
  {component: MovimentarObjetoComponent, path: 'movimentar-objeto'},
  {component: SceneComponent, path: 'scene'},
  {component: HomeComponent, path: 'home'},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
