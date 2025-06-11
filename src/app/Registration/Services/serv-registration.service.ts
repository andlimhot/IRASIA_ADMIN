import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VCustRegistration } from '../Models/VCustRegistration';
import { provincemdl } from '../Models/provincemdl';
import { citymdl } from '../Models/citymdl';
import { kecamatanmdl } from '../Models/kecamatanmdl';
import { kelurahanmdl } from '../Models/kelurahanmdl';
import { loginreponse } from '../Models/loginreponse';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ServRegistrationService {

  constructor(private http:HttpClient) { }

  getProvinceALL(): Observable<any>{
    return this.http.get<Array<provincemdl>>("http://193.111.124.45:9815/appmst-svc/appmst/getCmpsiListAll");  
  }

  getcitybyprovALL(provcode:string): Observable<any>{
    return this.http.get<Array<citymdl>>("http://193.111.124.45:9815/appmst-svc/appmst/getCmcitListByProvCode?ProvCode="+provcode);  
  }

  getKecbyCityALL(citycode:string): Observable<any>{
    return this.http.get<Array<kecamatanmdl>>("http://193.111.124.45:9815/appmst-svc/appmst/getCmkecListByCityCode?CityCode="+citycode);  
  }

  getKelbyKecALL(keccode:string): Observable<any>{
    return this.http.get<Array<kelurahanmdl>>("http://193.111.124.45:9815/appmst-svc/appmst/getCmkelListByKecCode?KecCode="+keccode);  
  }

  execLogin(userid:string, userpass:string, macaddress:string, pmsg:string): Observable<any>{    
    
    return this.http.get<loginreponse>("http://193.111.124.45:9815/am-svc/webadmin/exeLogin?userid="+userid+"&userpass="+userpass+"&macaddress="+macaddress)
    .pipe(
      catchError(this.handleError)
    );
    
  }

  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
      return throwError(() => new Error('Something bad happened; please try again later.'));
    } else {
      // Server-side error
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
       return throwError(() => new Error('Something bad happened; please try again later.'));
    }
  }

  getVRegisAll(): Observable<any>{
        return this.http.get<Array<VCustRegistration>>("http://193.111.124.45:9815/am-svc/admin/getRegistrationAll");  
      }

  getCustRegisById(Pregid:any): Observable<any>{
    return this.http.get<Array<VCustRegistration>>("http://193.111.124.45:9815/am-svc/admin/getRegistrationById?regId="+Pregid);  
  }
  
 /* SubmitRegistration222(p_userid:any, p_id:any): Observable<any>{
    return this.http.get<Array<VCustRegistration>>("http://193.111.124.45:9815/am-svc/admin/SubmitRegistrationEmpl?p_userid="+p_userid+'&p_id='+p_id);  
  }*/

  SubmitRegistration(p_userid:any, p_id:any):Observable<string>{
    const SubRegis:string="http://193.111.124.45:9815/am-svc/admin/SubmitRegistrationEmpl?p_userid="+p_userid+"&p_id="+p_id;
    return this.http.get(SubRegis, {responseType: 'text' as 'text'});
   }

   RejectRegistration(p_regid:any,p_email:any, p_user:any):Observable<string>{
    const SubRegis:string="http://193.111.124.45:9815/am-svc/webadmin/ProcRejectRegis?p_regid="+p_regid+"&p_email="+p_email+"&p_user="+p_user;
    return this.http.get(SubRegis, {responseType: 'text' as 'text'});
   }

}
