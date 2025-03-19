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
        return this.http.get<Array<CoreMstProductType>>("http://193.111.124.45:9815/appmst-svc/appmst/getCmprListAll");  
      }

  getProdTypeListByCode(prodcode:any): Observable<any>{
        return this.http.get<Array<CoreMstProductType>>("http://193.111.124.45:9815/appmst-svc/appmst/getCmprtListByCmprCode?CmprCode="+prodcode);  
      }
  
    getProdTypeSingle(prodcode:any,prodtype:any): Observable<any>{
      return this.http.get<Array<CoreMstProductType>>("http://193.111.124.45:9815/appmst-svc/appmst/getCmprTypeSingle?code="+prodcode+'&typecode='+prodtype);
  
      }
  
    saveupdateProdType(data:any):Observable<any>{   
        return this.http.post("http://193.111.124.45:9815/appmst-svc/appmst/saveupdprod",data, {responseType: 'text' as 'text'});
       }

    SaveCreateProductType(userid: string, data: CoreMstProductType, file1: File): Observable<string> {
          const formData = new FormData();
          formData.append('userid', userid);
          formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
      
          if (file1) { formData.append('file1', file1); }
      
          return this.http.post<string>('http://193.111.124.45:9815/appmst-svc/appmst/saveproducttypes', formData);
        }
      
      UpdateProductType(id: string, prodtypeid: string, userid: string, data: CoreMstProductType, file1: File): Observable<string> {
          const formData = new FormData();
          formData.append('id', id);
          formData.append('prodtypeid', prodtypeid);
          formData.append('userid', userid);
          formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
      
          if (file1) { formData.append('file1', file1); }
      
          return this.http.post<string>('http://193.111.124.45:9815/appmst-svc/appmst/UpdateProducttypes', formData);
        }

        getImages(no: string, typeno: string): Observable<string[]> {
          const url = `http://193.111.124.45:9815/appmst-svc/images/producttypebyprodtype?no=`+no +'&typeno='+typeno;
          return this.http.get<string[]>(url);
        }

}
