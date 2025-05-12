import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { employeemdl } from '../Models/employeemdl';
import { provincemdl } from 'src/app/Registration/Models/provincemdl';
import { citymdl } from 'src/app/Registration/Models/citymdl';
import { kecamatanmdl } from 'src/app/Registration/Models/kecamatanmdl';
import { kelurahanmdl } from 'src/app/Registration/Models/kelurahanmdl';

@Injectable({
  providedIn: 'root'
})
export class ServEmployeeService {

  constructor(private http:HttpClient) { }
  
  getEmplListAll(): Observable<any>{
        return this.http.get<Array<employeemdl>>("http://193.111.124.45:9815/am-svc/webadmin/getCmeListAll");  
      }
  
    getEmplSingle(p_nik:any): Observable<any>{
      return this.http.get<Array<employeemdl>>("http://193.111.124.45:9815/am-svc/webadmin/getEmplSingle?emplnik="+p_nik);
  
      }

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
  
    saveupdateProd(data:any):Observable<any>{   
        return this.http.post("http://193.111.124.45:9815/appmst-svc/appmst/saveupdprod",data, {responseType: 'text' as 'text'});
       }
  
  
    SaveCreateEmpl(userid: string, data: employeemdl, file1: File): Observable<string> {
        const formData = new FormData();
        formData.append('userid', userid);
        formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    
        if (file1) { formData.append('file1', file1); }
    
        return this.http.post<string>('http://193.111.124.45:9814/am-svc/webadmin/saveEmployee', formData);
      }
    
    UpdateEmpl(id: string, userid: string, data: employeemdl, file1: File): Observable<string> {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('userid', userid);
        formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    
        if (file1) { formData.append('file1', file1); }
    
        return this.http.post<string>('http://193.111.124.45:9815/am-svc/webadmin/UpdateEmployee', formData);
      }
  
      getReqEcByIdNo(req: string, no: string): Observable<any> {
        return this.http.get<Array<employeemdl>>("http://193.111.124.45:8091/wc-svc/webcust/getCtecdListByCtechIdAndCtecdId?CtechId="+req+"&CtecdId="+no);
      }
  
      getImages(no: string): Observable<string[]> {
        const url = `http://193.111.124.45:9815/am-svc/images/Emplbynik?no=`+no;
        return this.http.get<string[]>(url);
      }

}
