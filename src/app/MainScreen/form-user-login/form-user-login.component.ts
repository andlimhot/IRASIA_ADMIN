import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { loginreponse } from 'src/app/Registration/Models/loginreponse';
import { ServRegistrationService } from 'src/app/Registration/Services/serv-registration.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-form-user-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule  ],
  templateUrl: './form-user-login.component.html',
  styleUrls: ['./form-user-login.component.css']
})
export class FormUserLoginComponent implements OnInit{
  loginForm!: FormGroup;
  submitted = false;
  token: string = '';
  secretKey: string="12!@#$%abgz123";
  vusr:string="";
  vtkn:string="";
  vusrd:any;
  vtknd:any;

  constructor(private formBuilder: FormBuilder, private regiserv:ServRegistrationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }



  onSubmit() {  
    this.regiserv.execLogin(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value, "aaaaaaa","aaaaaa").subscribe(
      (response: loginreponse) => {
        this.vusr=this.encrypt(response.username);
        this.vtkn=this.encrypt(response.usertoken);
        sessionStorage.setItem('tkn',this.vtkn);
        sessionStorage.setItem('usr', this.vusr);
       // alert("aaaaaaa : "+ this.vtkn);
        this.vusrd=sessionStorage.getItem('usr');
        this.vtknd=sessionStorage.getItem('tkn');
        this.vusr=this.decrypt(this.vusrd)
        this.vtkn=this.decrypt(this.vtknd)
      //  alert("bbbbb : "+this.vtknd+ " --- "+this.vusrd);
       // alert("ccc : "+this.vtkn+ " --- "+this.vusr);
        console.log(this.vtkn);
      },
      (error) => {
        console.error(error);
       alert ('invalid Username And Password !!');
      }
    );
  }

  encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, this.secretKey).toString();
  }

  decrypt(ciphertext: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

}
