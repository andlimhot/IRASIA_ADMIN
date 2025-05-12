import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { bannersmdl } from '../Models/bannersmdl';

@Injectable({
  providedIn: 'root'
})
export class ServBannersService {

  constructor(private http:HttpClient) { }

  getBannerListAll(): Observable<any>{
        return this.http.get<Array<bannersmdl>>("http://193.111.124.45:9815/appmst-svc/appmst/getBannerListAll");  
      }
  
    getBannerSingle(prodcode:any): Observable<any>{
      return this.http.get<Array<bannersmdl>>("http://193.111.124.45:9815/appmst-svc/appmst/getBannerSingle?code="+prodcode);
  
      }
  
    saveupdateBanner(data:any):Observable<any>{   
        return this.http.post("http://193.111.124.45:9815/appmst-svc/appmst/saveupdprod",data, {responseType: 'text' as 'text'});
       }
  
  
    SaveCreateBanner(userid: string, data: bannersmdl, file1: File): Observable<string> {
        const formData = new FormData();
        formData.append('userid', userid);
        formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    
        if (file1) { formData.append('file1', file1); }
    
        return this.http.post<string>('http://193.111.124.45:9815/appmst-svc/appmst/saveBanners', formData);
      }
    
    UpdateBanner(id: string, userid: string, data: bannersmdl, file1: File): Observable<string> {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('userid', userid);
        formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    
        if (file1) { formData.append('file1', file1); }
    
        return this.http.post<string>('http://193.111.124.45:9815/appmst-svc/appmst/UpdateBanners', formData);
      }
  
      getBannerByIdNo(req: string, no: string): Observable<any> {
        return this.http.get<Array<bannersmdl>>("http://193.111.124.45:8091/wc-svc/webcust/getCtecdListByCtechIdAndCtecdId?CtechId="+req+"&CtecdId="+no);
      }
  
      getImages(no: string): Observable<string[]> {
        const url = `http://193.111.124.45:9815/appmst-svc/images/bannerImgbyId?no=`+no;
        return this.http.get<string[]>(url);
      }

}
