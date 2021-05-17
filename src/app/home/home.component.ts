import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Company } from '../models/company'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  companies: Array<any>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getPublicContent().subscribe(
      data => {
        //this.content = data;
          this.companies = data;
      },
      err => {
        this.companies = err.error.message;
      }
    );
  }
}
