import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, Subject, throwError } from 'rxjs';
import { loginresponse } from '../Models/loginresponse';
import { loginresponseempl } from '../Models/loginresponseempl';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ServLoginService {

  private callMethodSource = new Subject<void>();
  callMethodObservable = this.callMethodSource.asObservable();

  private callMethodSourcenavbar = new Subject<void>();
  callMethodObservablenavbar = this.callMethodSourcenavbar.asObservable();
  
  private resultSource = new BehaviorSubject<string>(''); // Observable untuk hasil
  result$ = this.resultSource.asObservable();


  private variableSource2 = new BehaviorSubject<string>('My Account');
  currentVariable$ = this.variableSource2.asObservable();


  private variableSource3 = new BehaviorSubject<string>('assets/user.png');
  currentVariable3$ = this.variableSource3.asObservable();

  constructor(private http: HttpClient) { }

  execLoginEmpl(userid:string, userpass:string, macaddress:string, pmsg:string): Observable<any>{ 
    
    return this.http.get<loginresponseempl>("http://193.111.124.45:9815/am-svc/webadmin/exeLoginEmpl?userid="+userid+"&userpass="+userpass+"&macaddress="+macaddress)
    .pipe(
      catchError(this.handleError)
    );    
  }

  execLogin(userid:string, userpass:string, macaddress:string, pmsg:string): Observable<any>{ 
    
    return this.http.get<loginresponse>("http://193.111.124.45:9815/am-svc/webadmin/exeLogin?userid="+userid+"&userpass="+userpass+"&macaddress="+macaddress)
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
  
  secretKey: string="12!@#$%abgz123";
  
  encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, this.secretKey).toString();
  }

  // Metode untuk dekripsi
  decrypt(ciphertext: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  updatemyacc(value: string) {
    this.variableSource2.next(value);
  }

  updatemyppc(value: string) {
    this.variableSource3.next(value);
  }

  callmethodfromothercomponent() {
  
    this.callMethodSource.next();
  }


}
