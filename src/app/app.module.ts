import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EncriptarComponent } from './encriptar/encriptar.component';
import { DesencriptarComponent } from './desencriptar/desencriptar.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { MatButtonModule } from '@angular/material/button';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { DragAndDropDescryptComponent } from './drag-and-drop-descrypt/drag-and-drop-descrypt.component';

// Export this function
export function playerFactory(): any {
  return import('lottie-web');
}

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'encriptar', component: EncriptarComponent},
  {path: 'desencriptar', component: DesencriptarComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EncriptarComponent,
    DesencriptarComponent,
    DragAndDropComponent,
    DragAndDropDescryptComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    LottieModule.forRoot({ player: playerFactory }) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
