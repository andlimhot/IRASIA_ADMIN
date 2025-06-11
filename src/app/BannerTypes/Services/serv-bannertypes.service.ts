import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bannertypesmdl } from '../Models/bannertypesmdl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServBannertypesService {

  constructor(private http: HttpClient) { }
  getBanTypeListAll(): Observable<any> {
    return this.http.get<Array<bannertypesmdl>>("http://193.111.124.45:9815/appmst-svc/appmst/getBanTypeListAll");
  }

  getBanTypeSingle(prodcode: any): Observable<any> {
    return this.http.get<Array<bannertypesmdl>>("http://193.111.124.45:9815/appmst-svc/appmst/getBanTypeSingle?code=" + prodcode);

  }


  SaveCreateBanType(userid: string, data: bannertypesmdl, file1: File): Observable<string> {
    const formData = new FormData();
    formData.append('userid', userid);
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));

    if (file1) { formData.append('file1', file1); }

    return this.http.post<string>('http://193.111.124.45:9815/appmst-svc/appmst/saveBannerType', formData);
  }

  UpdateBanType(id: string, userid: string, data: bannertypesmdl, file1: File): Observable<string> {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('userid', userid);
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));

    if (file1) { formData.append('file1', file1); }

    return this.http.post<string>('http://193.111.124.45:9815/appmst-svc/appmst/UpdateBannerType', formData);
  }

  getImages(no: string): Observable<string[]> {
    const url = `http://193.111.124.45:9815/appmst-svc/images/banTypeImgbyId?no=` + no;
    return this.http.get<string[]>(url);
  }

}
