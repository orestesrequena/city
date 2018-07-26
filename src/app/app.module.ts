import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HomeComponent } from "./home/home.component";
import { VignobleComponent } from './vignoble/vignoble.component';
import { VinComponent } from './vin/vin.component';
import { ContactComponent } from './contact/contact.component';
import { NewsComponent } from './news/news.component';


import { RoutingModule } from './routing.module';
import { VignobleService } from './vignoble.service';
import { VinService } from './vin.service';
import { NewsService } from './news.service';
import { VinIdComponent } from './vin/id/vinId.component';
import { VignobleIdComponent } from './vignoble/id/vignobleId.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VignobleComponent,
    VinComponent,
    NewsComponent,
    ContactComponent,
    VinIdComponent,
    VignobleIdComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'your API'
    })
  ],
  providers: [VignobleService, VinService, NewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
