import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewChecked, AfterViewInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ImageSlide } from './model/image-slide.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  providers: [NgbCarouselConfig]
})
export class CarouselComponent implements OnInit {

  @Input()
  imageSlides: ImageSlide[] = [];

  @Input()
  imageHeight = '250px';


  @Input()
  carouselConfiguration: NgbCarouselConfig;

  constructor(private config: NgbCarouselConfig) { }

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    if (this.carouselConfiguration) {
      this.config = this.carouselConfiguration;
    } else {
      this.setupCarouselDefaultConfig();
    }
    this.config.showNavigationArrows = (this.imageSlides.length > 1);
    this.config.showNavigationIndicators = (this.imageSlides.length > 1);
  }

  private setupCarouselDefaultConfig(): void {
    this.config.interval = 3000;
    this.config.wrap = true;
    this.config.keyboard = false;
    this.config.pauseOnHover = true;
  }
}
