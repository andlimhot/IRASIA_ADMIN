import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { ServQuoService } from '../../Services/serv-quo.service';
import { ServLoginService } from 'src/app/login/Services/serv-login.service';

@Component({
  selector: 'app-quo-cu-comment',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatIconModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule,
    MatCheckboxModule, MatInputModule, FormsModule],
  templateUrl: './quo-cu-comment.component.html',
  styleUrls: ['./quo-cu-comment.component.css']
})
export class QuoCuCommentComponent implements OnInit {

  RegisForm: FormGroup;

  p_type: string = '';
  p_usr: string = '';
  p_quono: string = '';
  p_regid: any;
  requestNumber: string = '';
  bankrcv: boolean = true;
  vusr: any;
  vusrd: any;
  vusrnm: any = "";
  vusrurl: any = "";
  vusnm: any = "";
  vusurl: any = "";
  reason: string = '';

  constructor(private regiServ: ServQuoService, private formBuider: FormBuilder, private http: HttpClient,
    private sanitizer: DomSanitizer, private logserv: ServLoginService,) {
    this.RegisForm = this.formBuider.group({
      ctqhReason: '',

      // --- FormArray untuk Bisnis Inti ---
      //bisnisInti: this.formBuider.array([]), // <-- PENTING: Definisikan di sini
      //
    });
  }

  ngOnInit(): void {
    this.vusrnm = sessionStorage.getItem('usnm');
    this.vusrd = sessionStorage.getItem('uscd');
    this.vusnm = this.logserv.decrypt(this.vusrnm);
    this.vusr = this.logserv.decrypt(this.vusrd);

  }

  RejectQuotation() {
    //let reason = this.RegisForm.get('vreason')?.value;
    alert('reject regist: ' + this.p_quono + '/' + this.reason + '/' + this.vusr);
    this.regiServ.RejectQuo(this.p_quono,this.reason,this.vusr)
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

  validateAndReject() {
    if (!this.reason || this.reason.trim() === '') {
      alert('Mohon input comment untuk melanjutkan reject!');
      return;
    }
    this.RejectQuotation();
  }

}
