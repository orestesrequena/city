import { Component, OnInit } from '@angular/core';

import { Vin, VinService } from "../vin.service";
import { Vignoble, VignobleService } from "../vignoble.service";
import { News, NewsService } from '../news.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  vins: Vin[];
  vignobles: Vignoble[];
  news: News[];

  constructor(

    private vinService: VinService,
    private vignobleService: VignobleService,
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.allNews();
    this.allVignobles();
  }

  allVignobles(): void {
    this.vignobleService.getVignobles()
      .subscribe(vignobles => {
        this.vignobles = vignobles;
      });
  }

  allNews(): void {
    this.newsService.getNews()
      .subscribe(news => {
        this.news = news;
      });
  }

}
