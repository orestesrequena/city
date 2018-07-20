import { Component, OnInit } from '@angular/core';
import {Vin, VinService} from "../../vin.service";
import {VinComponent} from "../vin.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-vinId',
  templateUrl: './vinId.component.html',
  styleUrls: ['./vinId.component.css']
})
export class VinIdComponent implements OnInit {
  id: number;
  vins:Vin[];


  constructor(
    private vinService: VinService,
    private _route: ActivatedRoute,
  ) {
    console.log(this._route.snapshot.paramMap.get('id'));
   }

  ngOnInit() {
    const id= +this._route.snapshot.paramMap.get('id');
    //this.detailVins(id);
    this.vinService.getVinNo404(id);
    //this.vinService.getHero(id).subscribe(vins => this.vins = vins);
  }

  allVins(): void {
    this.vinService.getVins()
      .subscribe(vins => {
        this.vins = vins;
      });
  }


  detailVins(vin: Vin): void {
    this.vinService.getVinNo404(vin._id).subscribe(data => {
      
    });
  }
}
