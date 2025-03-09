import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VCustRegistration } from '../Models/VCustRegistration';
import { provincemdl } from '../Models/provincemdl';
import { citymdl } from '../Models/citymdl';
import { kecamatanmdl } from '../Models/kecamatanmdl';
import { kelurahanmdl } from '../Models/kelurahanmdl';

@Injectable({
  providedIn: 'root'
})
export class ServRegistrationService {

  constructor(private http:HttpClient) { }

  getProvinceALL(): Observable<any>{
    return this.http.get<Array<provincemdl>>("http://localhost:9815/am-svc/appmst/getCmpsiListAll");  
  }

  getcitybyprovALL(provcode:string): Observable<any>{
    return this.http.get<Array<citymdl>>("http://localhost:9815/am-svc/appmst/getCmcitListByProvCode?ProvCode="+provcode);  
  }

  getKecbyCityALL(citycode:string): Observable<any>{
    return this.http.get<Array<kecamatanmdl>>("http://localhost:9815/am-svc/appmst/getCmkecListByCityCode?CityCode="+citycode);  
  }

  getKelbyKecALL(keccode:string): Observable<any>{
    return this.http.get<Array<kelurahanmdl>>("http://localhost:9815/am-svc/appmst/getCmkelListByKecCode?KecCode="+keccode);  
  }

  getVRegisAll(): Observable<any>{
        return this.http.get<Array<VCustRegistration>>("http://localhost:9814/wa-svc/admin/getRegistrationAll");  
      }

  getCustRegisById(Pregid:any): Observable<any>{
    return this.http.get<Array<VCustRegistration>>("http://localhost:9814/wa-svc/admin/getRegistrationById?regId="+Pregid);  
  }
  
  SubmitRegistration222(p_userid:any, p_id:any): Observable<any>{
    return this.http.get<Array<VCustRegistration>>("http://localhost:9814/wa-svc/admin/SubmitRegistrationEmpl?p_userid="+p_userid+'&p_id='+p_id);  
  }

  SubmitRegistration(p_userid:any, p_id:any):Observable<string>{
    const SubRegis:string="http://localhost:9814/wa-svc/admin/SubmitRegistrationEmpl?p_userid="+p_userid+"&p_id="+p_id;
    return this.http.get(SubRegis, {responseType: 'text' as 'text'});
   }

}
