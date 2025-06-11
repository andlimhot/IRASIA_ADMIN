import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestDtl } from '../Models/RequestDtl';
import { vrequestlist } from '../Models/vrequestlist';
import { DTORequestList } from '../Models/DTORequestList';
import { vrequestlistadm } from '../Models/vrequestlistadm';

@Injectable({
  providedIn: 'root'
})
export class RequestServService {
  curDate=new Date();
  constructor(private http: HttpClient) { }

  private getHeaders(tkn:string): HttpHeaders {
   
    if (tkn) {
      return new HttpHeaders({
        'Authorization': `Bearer ${tkn}`
      });
    } else {
      return new HttpHeaders();
    }
  }

  getAllReqEc(sr:string, tkn:string): Observable<RequestDtl[]> {
    const headers = this.getHeaders(tkn);
    return this.http.get<RequestDtl[]>("http://193.111.124.45:9815/wc-svc/webcust/getCtecdListAll");
  }

  getReqEcById(req: string, sr:string, tkn:string): Observable<any> {
    const headers = this.getHeaders(tkn);
    return this.http.get<Array<RequestDtl>>("http://193.111.124.45:9815/wc-svc/webcust/getCtecdListByCtechId?CtechId="+req);
  }

  getReqList(req: string, userid:string, usr:string, tkn:string): Observable<any> {
    const headers = this.getHeaders(tkn);
    return this.http.get<Array<DTORequestList>>("http://193.111.124.45:9815/wc-svc/webcust/getRequestListAdm?CtechId="+req+"&userid="+usr);
  }

  getReqEcByIdNo(req: string, no: string, sr:string, tkn:string): Observable<any> {
    const headers = this.getHeaders(tkn);
    return this.http.get<Array<RequestDtl>>("http://193.111.124.45:9815/wc-svc/webcust/getCtecdListByCtechIdAndCtecdId?CtechId="+req+"&CtecdId="+no);
  }

  getVReqByuser(tkn:string): Observable<vrequestlistadm[]> {
    const headers = this.getHeaders(tkn);
    return this.http.get<vrequestlistadm[]>("http://193.111.124.45:9815/wc-svc/webcust/getVReqAdmByStatus?Stat=SQ");
  }

  createReqWeb(userid: string, data: RequestDtl, file1: File, file2: File, file3: File, file4: File): Observable<string> {
    const formData = new FormData();
    formData.append('userid', userid);
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
   
    if (file1) { formData.append('file1', file1); }
    if (file2) { formData.append('file2', file2); }
    if (file3) { formData.append('file3', file3); }
    if (file4) { formData.append('file4', file4); }

    return this.http.post<string>('http://193.111.124.45:9815/wc-svc/webcust/saveupdreqecdtl',  formData);
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
   // const headers = this.getHeaders(tkn);
    return this.http.post<string>('http://193.111.124.45:9815/wc-svc/webcust/UpdateRequest',  formData);
  }

  deleteProduct(ctih: string, ctid:string, sr:string, tkn:string): Observable<any> {
    const headers = this.getHeaders(tkn);
    return this.http.delete('http://193.111.124.45:9815/wc-svc/webcust/DeleteRequestPic?ctih='+ctih+'&ctid='+ctid);
  }
  
  getImages(custNo: string, requestno: string, no: string, usr:string, tkn:string): Observable<string[]> {
    const url = `http://193.111.124.45:9815/wc-svc/images/${usr}/REQUEST/${requestno}?no=${no}`;
    const headers = this.getHeaders(tkn);
    return this.http.get<string[]>(url);
  }

  SendToWeb(p_reqno:string, p_seqno:string, p_user:string, p_best_price:string, p_best_product:string, p_new_product:string, p_sale:string):Observable<string>{
    const SubWeb:string="http://193.111.124.45:9815/am-svc/webadmin/SendReqToWeb?p_reqno="+p_reqno+"&p_seqno="+p_seqno+"&p_user="+p_user;+"&p_best_price="+p_best_price+"&p_best_product="+p_best_product+"&p_new_product="+p_new_product+"&p_sale="+p_sale;
    return this.http.get(SubWeb, {responseType: 'text' as 'text'});
   }

   UpdStsProductDtl(p_reqno: string, p_seqno:string, p_notes:string, p_user:string): Observable<any> {
    //const headers = this.getHeaders(tkn);
    return this.http.get("http://193.111.124.45:9815/am-svc/webadmin/ProcUpdateReq?p_reqno="+p_reqno+"&p_seqno="+p_seqno+"&p_notes="+p_notes+"&p_user="+p_user);
  }


}
