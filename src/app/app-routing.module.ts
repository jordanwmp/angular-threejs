import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeliumAtomComponent } from './helium-atom/helium-atom.component';
import { HomeComponent } from './home/home.component';
import { HydrogenAtomComponent } from './hydrogen-atom/hydrogen-atom.component';
import { MaterialsComponent } from './materials/materials.component';
import { MoveLightComponent } from './move-light/move-light.component';
import { MovimentarObjetoComponent } from './movimentar-objeto/movimentar-objeto.component';
import { OrbitCameraComponent } from './orbit-camera/orbit-camera.component';
import { SceneComponent } from './scene/scene.component';
import { SolarSystemComponent } from './solar-system/solar-system.component';
import { SunComponent } from './sun/sun.component';

const routes: Routes = [
  {component: MaterialsComponent, path: 'materials'},
  {component: HeliumAtomComponent, path: 'helium-atom'},
  {component: HydrogenAtomComponent, path: 'hydrogen-atom'},
  {component: OrbitCameraComponent, path: 'orbit-camera'},
  {component: SolarSystemComponent, path: 'solar-system'},
  {component: SunComponent, path: 'sun'},
  {component: MoveLightComponent, path: 'move-light'},
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
