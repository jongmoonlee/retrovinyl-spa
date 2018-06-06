import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  images: Array<string>;

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 8000;
    // config.wrap = false;
    // config.keyboard = true;
   }

  ngOnInit() {
    this.images = [
      `../../assets/img/carousel/7.jpg`,
      `../../assets/img/carousel/5.jpg`,
      `../../assets/img/carousel/ledzepplin01.jpg`,
      `../../assets/img/carousel/2.jpg`,
      `../../assets/img/carousel/blacksab.jpg`,
      `../../assets/img/carousel/1.jpg`,
      `../../assets/img/carousel/doors.jpeg`,
      `../../assets/img/carousel/3.jpg`,
      `../../assets/img/carousel/guns01.jpg`,
      `../../assets/img/carousel/4.png`,
      `../../assets/img/carousel/angus01.jpg`,
    ];
  }

  private _randomImageUrls(images: Array<{id: number}>): Array<string> {
    return [1, 2, 3, 4, 5, 6].map(() => {
      const randomId = images[Math.floor(Math.random() * images.length)].id;
      return `../../assets/img/carousel/${randomId}.jpg`;
    });
}
}
