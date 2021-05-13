import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company';
import { Bonus } from '../models/bonus';
import { TokenStorageService } from './token-storage.service';
import { News } from '../models/news';



const API_URL = 'http://localhost:8081/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  path: any;


  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserProfle(id: number): Observable<any> {
    let params = new HttpParams().set('id', id.toString());
    return this.http.get(API_URL + 'profile', {params: params});
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getCompanyContent(id: number): Observable<any> {
      return this.http.get(API_URL + 'company/' + id, { responseType: 'text'});
  }

  deleteCompany(id: number): Observable<any> {
      return this.http.delete<any>(API_URL + 'company/' + id + '/delete');
  }

  public addCompany(id: number, company: Company, image:File): Observable<any> {
      const formData = new FormData();
      Object.keys(company).forEach(key => formData.append(key, company[key]));
//      formData.append('bonus', JSON.stringify(company.bonus));
      return this.http.post<any>(API_URL + 'company/add/' + id, formData);
  }

  public addNews(id: number, news: News): Observable<any> {
//      const formData = new FormData();
//      Object.keys(news).forEach(key => formData.append(key, news[key]));
      return this.http.post<any>(API_URL + 'company/' + id + '/news/add', news);
  }

  public addComment(companyId: number, userId: number, text: string): Observable<any> {
//      const formData = new FormData();
//      formData.append('companyId', JSON.stringify(companyId));
//      formData.append('userId', JSON.stringify(userId));
//      formData.append('text', JSON.stringify(text));
      return this.http.post<any>(API_URL + 'company/comment/add', {companyId, userId, text});
  }

  public getComments(companyId: number): Observable<any> {
      return this.http.get<any>(API_URL + 'company/'+companyId+'/comments/show');
  }

  public addBonus(companyId: number, bonus: Bonus): Observable<any> {
      return this.http.post<any>(API_URL + 'company/' + companyId +'/bonus/add', bonus);
  }

  public support(userId: number, companyId: number, bonusId: number): Observable<any> {
//            const formData = new FormData();
//      formData.append('userId', JSON.stringify(userId));
//      formData.append('companyId', JSON.stringify(companyId));
//      formData.append('bonusId', JSON.stringify(bonusId));
      return this.http.post<any>(API_URL + 'company/support', {companyId, userId, bonusId});
  }
}


//{multipartFile: formData, name: company.description, description: company.description, bonus: company.bonus, subject: company.subject, video: company.video, amount: company.amount, deadline: company.deadline}

//name: company.name,
//    description: company.description,
//    bonus: company.bonus,
//    subject: company.subject,
//    video: company.video,
//    amount: company.amount,
//    deadline: company.deadline
