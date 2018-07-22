import { Component, OnInit } from '@angular/core';
import {Vignoble, VignobleService} from "../../vignoble.service";
import {Vin, VinService} from "../../vin.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-vignobleId',
  templateUrl: './vignobleId.component.html',
  styleUrls: ['./vignobleId.component.css']
})
export class VignobleIdComponent implements OnInit {
  
  id: number;
  vignoble: Vignoble;
  vin :Vin;
  lat: number = 51.678418;
  lng: number = 7.809007;
  
  constructor(
    private vignobleService: VignobleService,
    private vinService: VinService,
    private _route: ActivatedRoute,) { }

  ngOnInit() {
    const id= this._route.snapshot.paramMap.get('id');
    this.vignobleService.getVignobleNo404(id).subscribe(data => {
      this.vignoble =data;
    });
    this.vinService.getVignoble(id).subscribe(data => {
      this.vin =data;
    });
  }

}



