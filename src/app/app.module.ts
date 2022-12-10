import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SceneComponent } from './scene/scene.component';
import { HomeComponent } from './home/home.component';
import { MovimentarObjetoComponent } from './movimentar-objeto/movimentar-objeto.component';

@NgModule({
  declarations: [
    AppComponent,
    SceneComponent,
    HomeComponent,
    MovimentarObjetoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
