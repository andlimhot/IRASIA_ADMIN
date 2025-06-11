import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServLoginService } from '../../Services/serv-login.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { loginresponseempl } from '../../Models/loginresponseempl';
import { loginresponse } from '../../Models/loginresponse';
import * as CryptoJS from 'crypto-js';  
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login-comp',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule, MatDialogModule,  RouterModule,MatMenuModule,
      MatButtonModule, MatIconModule  ],
  templateUrl: './login-comp.component.html',
  styleUrls: ['./login-comp.component.css']
})
export class LoginCompComponent implements OnInit{

  loginForm!: FormGroup;
  submitted = false;
  token: string = '';
  secretKey: string="12!@#$%cdiz123";
  vusr:string="";
  vtkn:string="";
  vusrname:string="";
  vusrpic:string="";
  vusrimg:string="";
  vusrd:any;
  vtknd:any;
  resp:loginresponseempl[]=[];
  vusrnm:any="";
  vusrurl:any="";
  vusnm:any="";
  vusurl:any="";
  showPassword: boolean = false;
  

  constructor(private formBuilder: FormBuilder, private regiserv:ServLoginService,
    private dialogRef: MatDialogRef<LoginCompComponent>,private logserv:ServLoginService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.vusrd=sessionStorage.getItem('usnm');
   // this.vusr=this.regiserv.decrypt(this.vusrd)
    this.regiserv.updatemyacc(this.vusr);
  }

  onSubmit() {  
    this.regiserv.execLoginEmpl(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value, "13","aaaaaa").subscribe(
      (response: loginresponseempl) => {
        if (response.msg==='Error: Invalid User/Password.') {
          alert ('invalid Username And Password!!');
        }else{
       this.vusr=this.encrypt(response.emplnik);
        this.vusrname=this.encrypt(response.emplname);
      //alert("aaaaaaaaaa : "+response.emplnik+"----------"+response.emplname+'/'+response.msg);
    
       
       this.vusr = this.regiserv.encrypt(response.emplnik); // Gunakan Service
       //this.vtkn = this.regiserv.encrypt(response.usertoken);
       this.vusrname=this.regiserv.encrypt(response.emplname);
        //this.vusrpic=this.regiserv.encrypt(response.userpiccode);
       // this.vusrimg=this.regiserv.encrypt(response.userimageurl);
       // sessionStorage.setItem('tkn',this.vtkn);
        sessionStorage.setItem('uscd', this.vusr);
        sessionStorage.setItem('usnm',this.vusrname);
        //sessionStorage.setItem('usnm',response.emplname);
      //  sessionStorage.setItem('picnm', this.vusrpic);
      //  sessionStorage.setItem('usrimg',this.vusrimg);
        //this.vusrd=sessionStorage.getItem('uscd');
          this.vusrd=sessionStorage.getItem('usnm');
        //this.vtknd=sessionStorage.getItem('tkn');
       // this.vusr=this.regiserv.decrypt(this.vusrd);
       // this.vtkn=this.regiserv.decrypt(this.vtknd);
       //this.logserv.updatemyacc(this.vusr);
        //this.logserv.updatemyppc(response.userimageurl);
       this.dialogRef.close(true)
        } 
        this.callothermethod();        
       
      },
      (error) => {
        console.error(error);
       alert ('invalid Username And Password!!'+error);
      }
    
    );
    
    this.vusrd=sessionStorage.getItem('uscd');
    this.vusrnm=sessionStorage.getItem('usnm');
    
     this.vusr=this.logserv.decrypt(this.vusrd);
     this.vusnm=this.logserv.decrypt(this.vusrnm);
   // this.vusurl=this.logserv.decrypt(this.vusrurl);    

    this.logserv.updatemyacc(this.vusnm);
    //this.logserv.updatemyppc(this.vusurl) 
  }

  encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, this.secretKey).toString();
  }

  decrypt(ciphertext: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  callothermethod() {
    //alert('logincallinfomethod');
    this.logserv.callmethodfromothercomponent();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}
