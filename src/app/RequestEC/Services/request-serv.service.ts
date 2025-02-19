import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestDtl } from '../Models/RequestDtl';
import { vrequestlist } from '../Models/vrequestlist';

@Injectable({
  providedIn: 'root'
})
export class RequestServService {
  curDate=new Date();
  constructor(private http: HttpClient) { }

  getAllReqEc(): Observable<RequestDtl[]> {
    return this.http.get<RequestDtl[]>("http://localhost:8091/wc-svc/webcust/getCtecdListAll");
  }

  getReqEcById(req: string): Observable<any> {
    return this.http.get<Array<RequestDtl>>("http://localhost:8091/wc-svc/webcust/getCtecdListByCtechId?CtechId="+req);
  }

  getReqEcByIdNo(req: string, no: string): Observable<any> {
    return this.http.get<Array<RequestDtl>>("http://localhost:8091/wc-svc/webcust/getCtecdListByCtechIdAndCtecdId?CtechId="+req+"&CtecdId="+no);
  }

  getVReqByuser(usr:string): Observable<vrequestlist[]> {
    return this.http.get<vrequestlist[]>("http://localhost:8091/wc-svc/webcust/getVReqByUser?usr="+usr);
  }

  createReqWeb(userid: string, data: RequestDtl, file1: File, file2: File, file3: File, file4: File): Observable<string> {
    const formData = new FormData();
    formData.append('userid', userid);
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));

    if (file1) { formData.append('file1', file1); }
    if (file2) { formData.append('file2', file2); }
    if (file3) { formData.append('file3', file3); }
    if (file4) { formData.append('file4', file4); }

    return this.http.post<string>('http://localhost:8091/wc-svc/webcust/saveupdreqecdtl', formData);
  }


  UpdateReqWeb(id: string, userid: string, NoRequest:string, data: RequestDtl, file1: File, file2: File, file3: File, file4: File): Observable<string> {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('userid', userid);
    formData.append('NoRequest', NoRequest);
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));

    if (file1) { formData.append('file1', file1); }
    if (file2) { formData.append('file2', file2); }
    if (file3) { formData.append('file3', file3); }
    if (file4) { formData.append('file4', file4); }

    return this.http.post<string>('http://localhost:8091/wc-svc/webcust/UpdateRequest', formData);
  }

  deleteProduct(ctih: string, ctid:string): Observable<any> {
    return this.http.delete('http://localhost:8091/wc-svc/webcust/DeleteRequestPic?ctih='+ctih+'&ctid='+ctid);
  }
  
  getImages(custNo: string, requestno: string, no: string): Observable<string[]> {
    const url = `http://localhost:8091/wc-svc/images/${custNo}/REQUEST/${requestno}?no=${no}`;
    return this.http.get<string[]>(url);
  }

}
