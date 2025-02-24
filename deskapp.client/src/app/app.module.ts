import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, CommonModule, SharedModule,
    AppRoutingModule, MenubarModule
  ],
  providers: [provideHttpClient(), DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }