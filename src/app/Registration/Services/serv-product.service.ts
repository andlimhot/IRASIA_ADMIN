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
  
}
