import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { ProfileComponent } from './profile/profile.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { CompanyComponent } from './company/company.component'
import { ReadyComponent } from './image/ready.component';
import { NewComponent } from './image/new.component';
import { DetailComponent } from './image/detail.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
//import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { Company } from './models/company';
import { SafePipe } from './company/safe.pipe';
import {MatAccordion} from '@angular/material/expansion';
import { News } from './models/news';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SafePipeModule } from 'safe-pipe';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  threshold: 50,
  spaceBetween: 5,
  slidesPerView: 1,
  centeredSlides: true
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BoardAdminComponent,
    BoardUserComponent,
    ProfileComponent,
    CompanyComponent,
    ReadyComponent,
    DetailComponent,
    NewComponent,
      SafePipe
  ],
  imports: [
      SafePipeModule,
      MatProgressBarModule,
      MatCardModule,
      MatInputModule,
      MatStepperModule,
//      FormBuilder,
//      FormGroup,
//      Validators,
      ReactiveFormsModule,
      MatSortModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
      MatTableModule,
    //BrowserAnimationsModule,
    NgxSpinnerModule,
    HttpClientModule,
    //SwiperModule,
    //NgbModalModule,
    MatTabsModule,
    NgbModule,
    SwiperModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    SwiperModule,
      MatMenuModule,
      MatIconModule,
      MatButtonModule
  ],
  entryComponents: [DetailComponent],
  //providers: [authInterceptorProviders],
  providers: [authInterceptorProviders,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
               { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule,
           NgxSpinnerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
