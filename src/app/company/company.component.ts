import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { News } from '../models/news';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Bonus} from '../models/bonus';
import {ProgressBarMode} from '@angular/material/progress-bar';
import { BehaviorSubject } from 'rxjs';
import { switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
    private role: string;
    isLoggedIn = false;
    showCompanyToUser = false;
    company: any;

    userId: number;
    id: number;
    userInfo: any;
    newsFormGroup: FormGroup;
    commentFormGroup: FormGroup;
    bonusFormGroup: FormGroup;
    comments: any;
    temp: string;

    constructor(private tokenStorageService:
                 TokenStorageService, private userService: UserService, private route: ActivatedRoute, private formBuilder: FormBuilder, private news: News, private bonus: Bonus) {}

    ngOnInit() {
        this.id = this.route.snapshot.params.id;

        this.isLoggedIn = !!this.tokenStorageService.getToken();

        if(this.isLoggedIn){
            this.userId = this.tokenStorageService.getUser().id;        this.userService.getUserProfle(this.userId).subscribe
            (data => { this.userInfo = data; } );
        }



        this.userService.getComments(this.id).subscribe(data => { this.comments = data; });
        this.userService.getCompanyContent(this.id).subscribe(
            data => {
                this.company = JSON.parse(data);
            },
            err => {
                this.company = JSON.parse(err.error).message;
            });

        this.bonusFormGroup = this.formBuilder.group({
          bonusNameCtrl: [''],
          bonusPriceCtrl: ['']
        });

        this.newsFormGroup = this.formBuilder.group({
            nameCtrl: [''],
            descriptionCtrl: ['']
        });
        this.commentFormGroup = this.formBuilder.group({
            commentCtrl: []
        });
//        this.news.name = this.newsFormGroup.controls['nameCtrl'].value;
//        this.news.description = this.newsFormGroup.controls['descriptionCtrl'].value;
        /*if(this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.role = user.roles;

            if(this.role == 'ROLE_USER' || this.role == 'ROlE_ADMIN') {
                this.showCompanyToUser = true;
            }
        }*/

    }

    uploadNews(id: number): void {
        this.news.name =
        this.newsFormGroup.controls['nameCtrl'].value;
        this.news.description = this.newsFormGroup.controls['descriptionCtrl'].value;
        this.userService.addNews(id, this.news).subscribe();
    }

    uploadComment(): void {
        this.userService.addComment(this.id, this.userId, this.commentFormGroup.controls['commentCtrl'].value).subscribe();
        this.ngOnInit();
    }

    addBonus(id: number): void {
        this.bonus.name = this.bonusFormGroup.controls['bonusNameCtrl'].value;
        this.bonus.cost = this.bonusFormGroup.controls['bonusPriceCtrl'].value;
        this.userService.addBonus(id, this.bonus).subscribe();
    }

    support(bonusId: number): void {
        this.userService.support(this.userId, this.id, bonusId).subscribe();
        //window.location.reload();
    }

    progress(currentAmount: number, amount: number): number {
        return (currentAmount/amount)*100;
    }

}
