import { Component, OnInit } from '@angular/core';
import { Image } from '../models/image';
import { ImageService } from '../_services/image.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailComponent } from './detail.component';

@Component({
  selector: 'app-ready',
  templateUrl: './ready.component.html',
  styleUrls: ['./ready.component.css']
})
export class ReadyComponent implements OnInit {

  images: Image[] = [];

  constructor(
    private imageService: ImageService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
   this.uploadImages();
  }

  uploadImages(): void {
    this.imageService.list().subscribe(
      data => {
        this.images = data;
      }
    );
  }

  delete(id: number): void {
    this.spinner.show();
    this.imageService.delete(id).subscribe(
      data => {
        this.spinner.hide();
        this.uploadImages();
      },
      err => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }

  openModal(i: number): void {
    const modalRef = this.modalService.open(DetailComponent);
    modalRef.componentInstance.index = i;
  }

}
