import { Routes, RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { VinComponent } from './vin/vin.component';
import { VinIdComponent } from './vin/id/vinId.component';
import { VignobleComponent } from './vignoble/vignoble.component';
import { VignobleIdComponent } from './vignoble/id/vignobleId.component';
import { ContactComponent } from './contact/contact.component';


const APP_ROUTES: Routes = [
	{ path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'vignoble', component: VignobleComponent },
    { path: 'vignoble/:id', component: VignobleIdComponent },
    { path: 'vins', component: VinComponent },
    { path: 'vins/:id', component: VinIdComponent },
    { path: 'contact', component: ContactComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})

export class RoutingModule { }