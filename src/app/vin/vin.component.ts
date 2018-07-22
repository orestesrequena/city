import { Component, OnInit } from '@angular/core';
import {Vin, VinService} from "../vin.service";

@Component({
  selector: 'app-vin',
  templateUrl: './vin.component.html',
  styleUrls: ['./vin.component.css']
})
export class VinComponent implements OnInit {


  vins:Vin[];

  constructor(
    private vinService: VinService,
  ) { }

  ngOnInit() {
    this.allVins();
  }

  allVins(): void {
    this.vinService.getVins()
      .subscribe(vins => {
        this.vins = vins;
      });
  }




}
