import { Component, OnInit } from '@angular/core';

import {Vin, VinService} from "../vin.service";
import {Vignoble, VignobleService} from "../vignoble.service";
import { News,NewsService } from '../news.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  vins:Vin[];
  vignobles: Vignoble[];
  news: News[];

  constructor(
  
    private vinService: VinService,
    private vignobleService: VignobleService,
    private newsService: NewsService
  ) {}

  ngOnInit() {
   
    this.allNews();
    this.allVins();
  }

  // allClusters(): void {
  //   this.clusterService.getClusters()
  //     .subscribe(clusters => {
  //       this.clusters = clusters;
  //     });
  // }

  // // delete(cluster: Cluster): void {
  // //   this.clusters = this.clusters.filter(h => h !== cluster);
  // //   this.clusterService.deleteCluster(cluster).subscribe();
  // // }

  // detail(cluster: Cluster): void {
  //   this.clusterService.getClusterNo404(cluster._id).subscribe(data => {
      
  //   });
  // }

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

  allNews(): void {
    this.newsService.getNews()
      .subscribe(news => {
        this.news = news;
      });
  }


  detailNews(news: News): void {
    this.vinService.getVinNo404(news._id).subscribe(data => {
      
    });
  }

  // add(): void {
  //   let cluster: Cluster = {
  //     _id: 100,
  //     name: 'nuevo cluster',
  //     description: 'fze'
  //   };
  //   this.clusterService.addCluster(cluster).subscribe(response => {
  //     this.clusters.push(cluster);
  //   })
  // }

  // update(cluster: Cluster): void {
  //   cluster.name = 'random';
  //   this.clusterService.updateCluster(cluster).subscribe(response => {
      
  //   })
  // }

}
