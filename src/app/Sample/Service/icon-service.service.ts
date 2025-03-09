import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IconServiceService {


  private baseUrl = 'http://localhost:9815/am-svc/api/saveicons'; // Ganti dengan URL backend

  constructor(private http: HttpClient) { }

  uploadIcon(file: File, iconName: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('iconName', iconName);

    return this.http.post(this.baseUrl, formData);
  }
  
  private baseUrl2 = 'http://localhost:9815/am-svc/api/icons';
  getIcon(id: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl2}/${id}`, { responseType: 'blob' });
  }
}
