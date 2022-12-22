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

@NgModule({
  declarations: [
    AppComponent,
    SceneComponent,
    HomeComponent,
    MovimentarObjetoComponent,
    MoveCameraComponent,
    MoveLightComponent,
    SunComponent,
    SolarSystemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
