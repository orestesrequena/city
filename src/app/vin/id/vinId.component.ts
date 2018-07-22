import { Component, OnInit } from '@angular/core';
import { Vin, VinService } from "../../vin.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-vinId',
  templateUrl: './vinId.component.html',
  styleUrls: ['./vinId.component.css']
})
export class VinIdComponent implements OnInit {
  id: number;
  vin: Vin;


  constructor(
    private vinService: VinService,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    this.vinService.getVinNo404(id).subscribe(data => {
      this.vin = data;
    });
  }

}
