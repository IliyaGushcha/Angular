import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageService } from '../_services/image.service';
import { Router } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  @ViewChild('imageInputFile', {static: false}) imageFile: ElementRef;

  image: File;
  imageMin: File;

  constructor(
    private imageService: ImageService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }

  onFileChange(event) {
    this.image = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (imgEvent: any) => {
      this.imageMin = imgEvent.target.result;
    };
    fr.readAsDataURL(this.image);
  }


  onUpload(): void {
    this.spinner.show();
    this.imageService.upload(this.image).subscribe(
      data => {
        this.spinner.hide();
        this.router.navigate(['/']);
      },
      err => {
        alert(err.error.message);
        this.spinner.hide();
        this.reset();
      }
    );
  }

  reset(): void {
    this.image = null;
    this.imageMin = null;
    this.imageFile.nativeElement.value = '';
  }

}
