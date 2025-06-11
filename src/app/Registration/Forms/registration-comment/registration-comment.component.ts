import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ServRegistrationService } from '../../Services/serv-registration.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ServLoginService } from 'src/app/login/Services/serv-login.service';
import { ServProductService } from '../../Services/serv-product.service';
import { VCustRegistration } from '../../Models/VCustRegistration';

@Component({
  selector: 'app-registration-comment',
  standalone: true,
  imports: [CommonModule,  MatTabsModule, MatIconModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule, 
      MatCheckboxModule, MatInputModule, FormsModule],
  templateUrl: './registration-comment.component.html',
  styleUrls: ['./registration-comment.component.css']
})
export class RegistrationCommentComponent implements OnInit {

  RegisForm: FormGroup;
    vregislist: VCustRegistration[]=[];
    p_type: string ='';
    p_regid:any;
    requestNumber: string = '';
    preview='';
    preview2='';
    maxapp: number = 0;
    bankrcv: boolean = true;
    vusr:any;
    vusrd:any;
    vusrnm:any="";
    vusrurl:any="";
    vusnm:any="";
    vusurl:any="";
    reason: string = '';
  
    constructor(private regiServ : ServRegistrationService, private formBuider: FormBuilder, private http: HttpClient,
                private sanitizer: DomSanitizer,private logserv:ServLoginService, private _prodserv: ServProductService, ){
      this.RegisForm = this.formBuider.group({
        ccregId: '',
        ccregEmail: '',
        vreason : '',
        
        // --- FormArray untuk Bisnis Inti ---
        //bisnisInti: this.formBuider.array([]), // <-- PENTING: Definisikan di sini
        //
      });
    }
  
    ngOnInit(): void {
      this.vusrnm=sessionStorage.getItem('usnm');
      this.vusrd=sessionStorage.getItem('uscd');
      this.vusnm=this.logserv.decrypt(this.vusrnm);   
      this.vusr=this.logserv.decrypt(this.vusrd);
     
    }

    RejectRegis() {
      //let reason = this.RegisForm.get('vreason')?.value;
    alert('reject regist: '+this.p_regid+'/'+this.reason+'/'+this.vusr);
      this.regiServ.RejectRegistration(this.p_regid,this.reason,this.vusr)
        .subscribe(
          response => {
            this.requestNumber = response;
            console.log('Reject Succes'+this.requestNumber);
            // Tambahkan logika untuk menangani response sukses, misalnya:
            // - Reset form
            // - Tampilkan pesan sukses
            // - Redirect ke halaman lain
          },
          error => {
            console.error('Terjadi kesalahan:', error);
            // Tambahkan logika untuk menangani error, misalnya:
            // - Tampilkan pesan error
          }
        );
        //alert('endsubmitregist');
  }

}
