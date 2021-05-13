import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imageURL = 'https://my-crowdfunding-project.herokuapp.com/api/test/';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Image[]> {
    return this.httpClient.get<Image[]>(this.imageURL + 'list');
  }

  public upload(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', image);
    return this.httpClient.post<any>(this.imageURL + 'upload', formData);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.imageURL + `delete/${id}`);
  }
}
