import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreMstProductType } from '../Models/CoreMstProductType';

@Injectable({
  providedIn: 'root'
})
export class ServProducttypeService {

  constructor(private http:HttpClient) { }

  getProdTypeListAll(): Observable<any>{
        return this.http.get<Array<CoreMstProductType>>("http://localhost:8090/am-svc/appmst/getCmprListAll");  
      }

  getProdTypeListByCode(prodcode:any): Observable<any>{
        return this.http.get<Array<CoreMstProductType>>("http://localhost:8090/am-svc/appmst/getCmprtListByCmprCode?"+prodcode);  
      }
  
    getProdTypeSingle(prodcode:any): Observable<any>{
      return this.http.get<Array<CoreMstProductType>>("http://localhost:8090/am-svc/appmst/getCmprSingle?code="+prodcode);
  
      }
  
    saveupdateProdType(data:any):Observable<any>{   
        return this.http.post("http://localhost:8090/am-svc/appmst/saveupdprod",data, {responseType: 'text' as 'text'});
       }

}
