import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SceneComponent } from './scene/scene.component';
import { HomeComponent } from './home/home.component';
import { MovimentarObjetoComponent } from './movimentar-objeto/movimentar-objeto.component';
import { MoveCameraComponent } from './move-camera/move-camera.component';
import { MoveLightComponent } from './move-light/move-light.component';
import { SunComponent } from './sun/sun.component';
import { SolarSystemComponent } from './solar-system/solar-system.component';
import { OrbitCameraComponent } from './orbit-camera/orbit-camera.component';
import { HydrogenAtomComponent } from './hydrogen-atom/hydrogen-atom.component';
import { HeliumAtomComponent } from './helium-atom/helium-atom.component';
import { MaterialsComponent } from './materials/materials.component';

@NgModule({
  declarations: [
    AppComponent,
    SceneComponent,
    HomeComponent,
    MovimentarObjetoComponent,
    MoveCameraComponent,
    MoveLightComponent,
    SunComponent,
    SolarSystemComponent,
    OrbitCameraComponent,
    HydrogenAtomComponent,
    HeliumAtomComponent,
    MaterialsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
