import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import {HomeComponent} from "./home/home.component";
import { VignobleComponent } from './vignoble/vignoble.component';
 import { VinComponent } from './vin/vin.component';
 import { ContactComponent } from './contact/contact.component';
 import { NewsComponent } from './news/news.component';


import { RoutingModule } from './routing.module';
import { ClusterService } from './cluster.service';
import { VignobleService } from './vignoble.service';
import { VinService } from './vin.service';
import { NewsService } from './news.service';
import { VinIdComponent } from './vin/id/vinId.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VignobleComponent,
    VinComponent,
    NewsComponent,
    ContactComponent,
    VinIdComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule
  ],
  providers: [VignobleService, VinService, NewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
