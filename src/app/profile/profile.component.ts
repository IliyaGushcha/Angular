import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { TokenStorageService } from '../_services/token-storage.service';
import {MatSort} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {UserService} from '../_services/user.service';
import {MatTableModule} from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { formatDate } from '@angular/common';
import { Company } from '../models/company';
import { Bonus } from '../models/bonus';
import { Injectable } from '@angular/core';
/**
 * @title Tab group with aligned labels
 */


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

@Injectable()
export class ProfileComponent implements OnInit {
  isLinear = false;
  nameFormGroup: FormGroup;
  descriptionFormGroup: FormGroup;
  //bonusFormGroup: FormGroup;
  subjectFormGroup: FormGroup;
  videoFormGroup: FormGroup;
  moneyFormGroup: FormGroup;
  imagesFormGroup: FormGroup;
  deadlineFormGroup: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'star'];
  displayedBonusColumns: string[] = ['id', 'name', 'cost'];
  currentUser: any;
  image: File;
  imageMin: File;


  profileContent: any = [];
  constructor(private token: TokenStorageService, private userService: UserService, private _formBuilder: FormBuilder, private bonus: Bonus, private newCompany: Company) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.currentUser = this.token.getUser().id;
    this.userService.getUserProfle(this.currentUser).subscribe(data => {
        this.profileContent = data;
    });

      this.nameFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required]
    });

    this.descriptionFormGroup = this._formBuilder.group({
      descriptionCtrl: ['', Validators.required]
    });


//      this.bonusFormGroup = this._formBuilder.group({
//      bonusNameCtrl: ['', Validators.required],
//      bonusPriceCtrl: ['', Validators.required]
//    });

      this.subjectFormGroup = this._formBuilder.group({
      subjectCtrl: ['', Validators.required]
    });

      this.videoFormGroup = this._formBuilder.group({
      videoCtrl: ['', Validators.required]
    });

      this.moneyFormGroup = this._formBuilder.group({
      moneyCtrl: ['', Validators.required]
    });

      this.deadlineFormGroup = this._formBuilder.group({
      deadlineCtrl: ['', Validators.required]
    });

  }

     onFileChange(event) {
    this.image = event.target.files[0];
    //this.newCompany.image = this.image;
    const fr = new FileReader();
    fr.onload = (imgEvent: any) => {
      this.imageMin = imgEvent.target.result;
    };
    fr.readAsDataURL(this.image);
  }

  ngAfterViewInit() {
    this.profileContent.sort = this.sort;
  }

    onUpload(): void {
        this.newCompany.name = this.nameFormGroup.controls['nameCtrl'].value;
        this.newCompany.description = this.descriptionFormGroup.controls['descriptionCtrl'].value;
//        this.bonus.name = this.bonusFormGroup.controls['bonusNameCtrl'].value;
//      this.bonus.cost = this.bonusFormGroup.controls['bonusPriceCtrl'].value;
//      this.newCompany.bonus = this.bonus;
        this.newCompany.subject = this.subjectFormGroup.controls['subjectCtrl'].value;
        this.newCompany.video = this.videoFormGroup.controls['videoCtrl'].value;
        this.newCompany.amount = this.moneyFormGroup.controls['moneyCtrl'].value;
        this.newCompany.amount = this.moneyFormGroup.controls['moneyCtrl'].value;
        this.newCompany.deadline = this.deadlineFormGroup.controls['deadlineCtrl'].value;
        this.newCompany.image = this.image;
    this.userService.addCompany(this.currentUser, this.newCompany, this.image).subscribe();
      }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.profileContent.filter = filterValue.trim().toLowerCase();
  }

  delete(id: number): void {
      this.userService.deleteCompany(id).subscribe();
  }
}
