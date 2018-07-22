import { Component, OnInit } from '@angular/core';
import {Vignoble, VignobleService} from "../vignoble.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-vignoble',
  templateUrl: './vignoble.component.html',
  styleUrls: ['./vignoble.component.css']
})
export class VignobleComponent implements OnInit {

  vignobles: Vignoble[];
  constructor(
    private vignobleService: VignobleService,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.allVignobles();
  }

  allVignobles(): void {
    this.vignobleService.getVignobles()
      .subscribe(vignobles => {
        this.vignobles = vignobles;
      });
  }

  detailVignobles(vignoble: Vignoble): void {
    const id= this._route.snapshot.paramMap.get('id');
    this.vignobleService.getVignobleNo404(id).subscribe(data => {
      
    });
  }

}

