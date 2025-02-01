import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreMstProduct } from '../Models/CoreMstProduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServProductService {

  constructor(private http:HttpClient) { }

  getProdListAll(): Observable<any>{
      return this.http.get<Array<CoreMstProduct>>("http://localhost:8090/am-svc/appmst/getCmprListAll");  
    }

  getProdSingle(prodcode:any): Observable<any>{
    return this.http.get<Array<CoreMstProduct>>("http://localhost:8090/am-svc/appmst/getCmprSingle?code="+prodcode);

    }

  saveupdateProd(data:any):Observable<any>{   
      return this.http.post("http://localhost:8090/am-svc/appmst/saveupdprod",data, {responseType: 'text' as 'text'});
     }


  SaveCreateProduct(userid: string, data: CoreMstProduct, file1: File): Observable<string> {
      const formData = new FormData();
      formData.append('userid', userid);
      formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  
      if (file1) { formData.append('file1', file1); }
  
      return this.http.post<string>('http://localhost:8090/am-svc/appmst/saveproducts', formData);
    }
  
  UpdateProduct(id: string, userid: string, data: CoreMstProduct, file1: File): Observable<string> {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('userid', userid);
      formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  
      if (file1) { formData.append('file1', file1); }
  
      return this.http.post<string>('http://localhost:8090/am-svc/appmst/UpdateProducts', formData);
    }

    getReqEcByIdNo(req: string, no: string): Observable<any> {
      return this.http.get<Array<CoreMstProduct>>("http://localhost:8091/wc-svc/webcust/getCtecdListByCtechIdAndCtecdId?CtechId="+req+"&CtecdId="+no);
    }

    getImages(no: string): Observable<string[]> {
      const url = `http://localhost:8090/am-svc/images/productImgbyId?no=`+no;
      return this.http.get<string[]>(url);
    }
}
