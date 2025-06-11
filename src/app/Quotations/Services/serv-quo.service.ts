import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VQuoHdrList } from '../Models/VQuoHdrList';
import { QuotationHdr } from '../Models/QuotationHdr';
import { DtoQuoByProduct } from '../Models/DtoQuoByProduct';
import { QuotationDetail } from '../Models/QuotationDetail';

@Injectable({
  providedIn: 'root'
})
export class ServQuoService {
  decrypt(vusrnm: any): any {
    throw new Error('Method not implemented.');
  }

  private getHeaders(tkn:string): HttpHeaders { 
    if (tkn) {
      return new HttpHeaders({
        'Authorization': `Bearer ${tkn}`
      });
    } else {
      return new HttpHeaders();
    }
  }

  constructor(private http: HttpClient) { }
  
  QuoList(): Observable<any>{
      return this.http.get<Array<VQuoHdrList>>("http://193.111.124.45:9815/wc-svc/quo/getQuoListAll");  
    }
  
    QuoManualListByUser(userid:string, tkn:string): Observable<any>{
    const headers = this.getHeaders(tkn);
      return this.http.get<Array<VQuoHdrList>>("http://193.111.124.45:9815/wc-svc/quo/getQuoListByUserId?userid="+userid);  
  }

  QuoManualListBySts(type:string, tkn:string): Observable<any>{
    const headers = this.getHeaders(tkn);
      return this.http.get<Array<VQuoHdrList>>("http://193.111.124.45:9815/wc-svc/quo/getQuoListBySts?stat=SQ&appr="+type);
  }

  getQuoListByIdUser(userid:string, quoid:string, tkn:string): Observable<any>{
    const headers = this.getHeaders(tkn);
      return this.http.get<Array<QuotationHdr>>("http://193.111.124.45:9815/wc-svc/quo/getquobyidcuscode?quoid="+quoid+"&cuscode="+userid);  
    }
  
  
  QuoSaveHdr(data:any):Observable<any>{   
      return this.http.post("http://193.111.124.45:9819/wc-svc/quo/saveQuotation",data, {responseType: 'text' as 'text'});
     }
  
   createQuoHdr(userid: string, data: QuotationDetail, file1: File, file2: File): Observable<any> {
    const formData = new FormData();
    alert("aaaaaa :"+file1.size+" ---- "+file2.size+ " ---- "+ data.ctqdNotes);
    formData.append('userid', userid);
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
   
    if (file1) { formData.append('file1', file1); }
    if (file2) { formData.append('file2', file2); }

    console.log("aaaaaaaaaaa :"+JSON.stringify(formData))
  
    return this.http.post('http://193.111.124.45:9815/quo/saveQuotation',  formData, {responseType: 'text' as 'text'});
  }
  
  //===================================quotation by product===================================

  QuoListByUser (userid:string, tkn:string): Observable<any>{
        const headers = this.getHeaders(tkn);
          return this.http.get<Array<VQuoHdrList>>("http://193.111.124.45:9815/wc-svc/quo/getQuomanualListByUserId?userid="+userid);  
  }

  QuoListBySts (userid:string, tkn:string): Observable<any>{
        const headers = this.getHeaders(tkn);
          return this.http.get<Array<VQuoHdrList>>("http://193.111.124.45:9815/wc-svc/quo/getQuomanualListBySts?stat=SQ");  
  }

  QuoListByQuoidUser (quoid:string, userid:string, tkn:string): Observable<any>{
    const headers = this.getHeaders(tkn);
      return this.http.get<Array<DtoQuoByProduct>>(" http://193.111.124.45:9815/wc-svc/webcust/getquotationtList?CtqdId="+quoid+"&userid="+userid);
  }

  QuoListByQuoi (quoid:string,  tkn:string): Observable<any>{
    const headers = this.getHeaders(tkn);
      return this.http.get<Array<QuotationDetail>>("http://193.111.124.45:9815/wc-svc/webcust/getCtqdListByCtqhId?CtqhId="+quoid);
  }

  QuoDtlSingle (quoid:string, no:string, tkn:string): Observable<any>{
    const headers = this.getHeaders(tkn);
      return this.http.get<Array<QuotationDetail>>("http://193.111.124.45:9815/wc-svc/webcust/getQuoDtl?ctqdCtqhId="+quoid+"&ctqdId="+no);
  }

  getImagesquoHdr(custNo: string, quono: string, usr:string, tkn:string): Observable<string[]> {
    const url = `http://193.111.124.45:9815/wc-svc/images/${usr}/QUOTATIONSH/${quono}`;
    const headers = this.getHeaders(tkn);
    return this.http.get<string[]>(url);
  }

  getImagesquo(custNo: string, quono: string, no: string, usr:string, tkn:string): Observable<string[]> {
    const url = `http://193.111.124.45:9815/wc-svc/images/${usr}/QUOTATIONS/${quono}?no=${no}`;
    const headers = this.getHeaders(tkn);
    return this.http.get<string[]>(url);
  }

  createQuoWeb(userid: string, data: QuotationDetail, file1: File, file2: File, file3: File, file4: File): Observable<any> {
    const formData = new FormData();
    formData.append('userid', userid);
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
   
    if (file1) { formData.append('file1', file1); }
    if (file2) { formData.append('file2', file2); }
    if (file3) { formData.append('file3', file3); }
    if (file4) { formData.append('file4', file4); }
  
    return this.http.post('http://193.111.124.45:9815/wc-svc/webcust/savequodtl',  formData, {responseType: 'text' as 'text'});
  }

  UpdateQuoWeb(id: string, userid: string, NoQuo:string, data: QuotationDetail, file1: File, file2: File, file3: File, file4: File): Observable<any> {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('userid', userid);
    formData.append('NoQuo', NoQuo);
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  
    if (file1) { formData.append('file1', file1); }
    if (file2) { formData.append('file2', file2); }
    if (file3) { formData.append('file3', file3); }
    if (file4) { formData.append('file4', file4); }
   // const headers = this.getHeaders(tkn);
    return this.http.post('http://193.111.124.45:9815/wc-svc/webcust/UpdateQuobyProduct',  formData, {responseType: 'text' as 'text'});
  }

  ProcQuoToBalst(p_quono: string, p_user:string): Observable<any> {
    //const headers = this.getHeaders(tkn);
    return this.http.get("http://193.111.124.45:9815/am-svc/webadmin/ProcQuoToBlast?p_quono="+p_quono+"&p_user="+p_user);
  }

  RejectQuo(p_quono: string,p_notes: string, p_user:string): Observable<any> {
    //const headers = this.getHeaders(tkn);
    return this.http.get("http://193.111.124.45:9815/am-svc/webadmin/ProcRejectQuo?p_quono="+p_quono+"&p_notes="+p_notes+"&p_user="+p_user);
  }

}
