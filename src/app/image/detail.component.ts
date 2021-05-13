import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from '../_services/image.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Image } from '../models/image';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() index;

    images: Image[] = [];
    activeModal: NgbActiveModal;
    private imageService: ImageService;

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false
  };

  constructor(

  ) { }

  ngOnInit() {
    this.config.initialSlide = this.index;
    this.imageService.list().subscribe(
      data => {
        this.images = data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
