import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VCustRegistration } from '../Models/VCustRegistration';

@Injectable({
  providedIn: 'root'
})
export class ServRegistrationService {

  constructor(private http:HttpClient) { }

  getCustRegisById(): Observable<any>{
    return this.http.get<Array<VCustRegistration>>("http://localhost:9814/wa-svc/admin/getRegistrationById?regId=1");  
  }
}
