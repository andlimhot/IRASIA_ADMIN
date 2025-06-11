import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { ServRegistrationService } from '../../Services/serv-registration.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VCustRegistration } from '../../Models/VCustRegistration';
import { provincemdl } from '../../Models/provincemdl';
import { citymdl } from '../../Models/citymdl';
import { kecamatanmdl } from '../../Models/kecamatanmdl';
import { kelurahanmdl } from '../../Models/kelurahanmdl';
import { bankmdl } from '../../Models/bankmdl';
import { ServLoginService } from 'src/app/login/Services/serv-login.service';
import { CoreMstProduct } from '../../Models/CoreMstProduct';
import { ServProductService } from '../../Services/serv-product.service';
import { RegistrationCommentComponent } from '../registration-comment/registration-comment.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-registration-cu',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatIconModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule,
    MatCheckboxModule, MatInputModule, FormsModule],
  templateUrl: './registration-cu.component.html',
  styleUrls: ['./registration-cu.component.css']
})
export class RegistrationCUComponent implements OnInit {
  RegisForm: FormGroup;
  vregislist: VCustRegistration[] = [];
  base64String: string = 'your_base64_image_string_here';
  base64String2: string = 'your_base64_image_string_here';
  imageNikUrl: SafeUrl | null = null;
  imageNibUrl: SafeUrl | null = null;
  p_type: string = '';
  p_regid: any;
  p_provcode: string = '';
  p_citycode: string = '';
  p_keccode: string = '';
  p_maxapp: number = 0;
  provlist: provincemdl[] = [];
  citylist: citymdl[] = [];
  keclist: kecamatanmdl[] = [];
  kellist: kelurahanmdl[] = [];
  banklist: bankmdl[] = [];
  vprov = new FormControl('');
  vcity = new FormControl('');
  vkec = new FormControl('');
  vkel = new FormControl('');
  selectedprov: string = 'a';
  selectedcity: string = 'a';
  selectedkec: string = 'a';
  selectedkel: string = 'a';
  selectedbank: string = 'a';
  requestNumber: string = '';
  preview = '';
  preview2 = '';
  maxapp: number = 0;
  bankrcv: boolean = true;
  vusr: any;
  vusrd: any;
  vusrnm: any = "";
  vusrurl: any = "";
  vusnm: any = "";
  vusurl: any = "";
  vprodlist: CoreMstProduct[] = [];
  vpickbuss: string = "aaa";

  imagePreview: string | null = null;
  imagePreview2: string | null = null;
  modalImage: SafeResourceUrl | null = null;
  modalImage2: SafeResourceUrl | null = null;



  constructor(private regiServ: ServRegistrationService, private formBuider: FormBuilder, private http: HttpClient,
    private sanitizer: DomSanitizer, private logserv: ServLoginService, private _prodserv: ServProductService, private dialog: MatDialog, private dialogRef: MatDialogRef<RegistrationCUComponent>) {
    this.RegisForm = this.formBuider.group({
      ccregId: '',
      ccregAddress: '',
      ccregArea: '',
      ccregCityId: '',
      ccregEmail: '',
      ccregKecId: '',
      ccregKelId: '',
      ccregLongLat: '',
      ccregMinApproval: '',
      ccregMobilePhone: '',
      ccregName: '',
      ccregNationId: '',
      ccregNationImgFileName: '',
      ccregNikImage: '',
      ccregNibId: '',
      ccregNibImgFileName: '',
      ccregNibImage: '',
      ccregNickName: '',
      ccregPhone: '',
      ccregPic1Email: '',
      ccregPic1Name: '',
      ccregPic1Phone: '',
      ccregPic1password: '',
      ccregPic2Email: '',
      ccregPic2Name: '',
      ccregPic2Phone: '',
      ccregPic2password: '',
      ccregPic3Email: '',
      ccregPic3Name: '',
      ccregPic3Phone: '',
      ccregPic3password: '',
      ccregProvId: '',
      ccregRecvCmbaName: '',
      ccregRevcCmbaAccount: '',
      ccregRevcCmbaId: '',
      ccregRt: '',
      ccregRw: '',
      ccregSentCmbaAccount: '',
      ccregSentCmbaId: '',
      ccregSentCmbaName: '',
      ccregZip: '',
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

    this.getVRegis();
    this.maxapp = this.p_maxapp;
    this.getProduct(); // 2. Ambil data produk (ini akan memanggil createBisnisIntiControls)
    this.getprovince();
    this.getcity(this.p_provcode);
    this.getkecamatan(this.p_citycode);
    this.getkelurahan(this.p_keccode);
    alert(this.p_provcode + '/' + this.p_citycode + '/' + this.p_keccode);

  }

  // --- Getter untuk FormArray Controls ---
  get bisnisIntiControls(): AbstractControl[] {
    // Tambahkan pengecekan untuk memastikan form sudah ada
    const control = this.RegisForm?.get('bisnisInti');
    return control instanceof FormArray ? control.controls : [];
  }
  //

  closeForm() {
    this.dialogRef.close(true)
  }

  changeprov(value: any) {
    this.citylist = [];
    this.keclist = [];
    this.kellist = [];
    this.selectedprov = value;
    //this.getcity(this.selectedprov);
  }

  getprovince() {
    this.provlist = [];
    this.regiServ.getProvinceALL().subscribe((res: provincemdl[]) => {
      this.provlist = res;
      console.log(this.provlist.length);
    });
  }

  changecity(value: any) {
    this.keclist = [];
    this.kellist = [];
    this.selectedcity = value;
    //this.getkecamatan(this.selectedcity);
  }

  changekecamatan(value: any) {
    this.kellist = [];
    this.selectedkec = value;
    //this.getkelurahan( this.selectedkec);
  }

  getcity(ct: string) {
    this.citylist = [];
    this.regiServ.getcitybyprovALL(ct).subscribe((res: citymdl[]) => {
      this.citylist = res;
    });
  }

  changekelurahan(value: any) {
    this.selectedkel = value;
  }

  getkecamatan(kc: string) {
    this.keclist = [];
    this.regiServ.getKecbyCityALL(kc).subscribe((res: kecamatanmdl[]) => {
      this.keclist = res;
    });
  }

  getkelurahan(kl: string) {
    this.kellist = [];
    this.regiServ.getKelbyKecALL(kl).subscribe((res: kelurahanmdl[]) => {
      this.kellist = res;
    });
  }

  //tambahan ceklis
  getProduct() {
    // Cek jika form sudah diinisialisasi
    if (!this.RegisForm) {
      console.error("RegisForm belum diinisialisasi saat getProduct dipanggil.");
      return;
    }
    //alert('prodlisssstt')
    this._prodserv.getProdListAll().subscribe(
      (res: CoreMstProduct[]) => {
        console.log("Data produk diterima:", res);
        this.vprodlist = res;
        //alert('prodcutlist: '+'/'+this.vprodlist.length);
        this.createBisnisIntiControls(); // Panggil SETELAH vprodlist diisi
      },
      (error) => {
        console.error("Gagal mengambil data produk:", error);
        this.vprodlist = [];
        this.createBisnisIntiControls(); // Tetap panggil untuk mengosongkan/membuat array kosong
      }
    );
  }

  // --- Method createBisnisIntiControls (sudah benar) ---
  createBisnisIntiControls() {
    // Cek jika form dan FormArray sudah ada
    // alert('create bisnis');
    if (!this.RegisForm || !this.RegisForm.get('bisnisInti')) {
      console.error("Form atau FormArray 'bisnisInti' belum siap saat createBisnisIntiControls dipanggil.");
      return;
    }
    const bisnisIntiArray = this.RegisForm.get('bisnisInti') as FormArray;
    // Cek tipe sebelum clear (defensive coding)
    if (bisnisIntiArray instanceof FormArray) {
      bisnisIntiArray.clear();
      this.vprodlist.forEach(() => bisnisIntiArray.push(this.formBuider.control(false)));
      console.log('FormArray bisnisInti dibuat/diupdate:', bisnisIntiArray.length, 'kontrol');
    } else {
      console.error("'bisnisInti' bukan FormArray.");
    }
  }
  // -------------------------------------------------------

  // --- Method getSelectedProductData (sudah benar) ---
  getSelectedProductData(): CoreMstProduct[] {
    this.vpickbuss = "";
    const selectedProducts: CoreMstProduct[] = [];
    // Pastikan form dan FormArray ada
    if (!this.RegisForm || !this.RegisForm.get('bisnisInti')) {
      console.warn('Form atau FormArray bisnisInti tidak tersedia.');
      return [];
    }
    const bisnisIntiArrayValue = this.RegisForm.get('bisnisInti')?.value as boolean[];

    if (bisnisIntiArrayValue && this.vprodlist.length === bisnisIntiArrayValue.length) {
      bisnisIntiArrayValue.forEach((isSelected, index) => {
        if (isSelected && this.vprodlist[index]) { // Cek isSelected dan index valid
          selectedProducts.push(this.vprodlist[index]);
          this.vpickbuss = this.vpickbuss + this.vprodlist[index].cmprCode + ", ";
        }
      });
    } else {
      console.warn('FormArray bisnisInti atau vprodlist tidak sinkron atau kosong.');
    }
    // alert(this.vpickbuss);
    console.log("Produk terpilih (dari FormArray):", selectedProducts);
    return selectedProducts;
  }


  getVRegis() {
    this.vregislist = [];
    //alert("aaaaa");
    this.regiServ.getCustRegisById(this.p_regid).subscribe((res: VCustRegistration[]) => {
      this.vregislist = res;
      // alert("rhl00003");
      for (var i = 0; i < this.vregislist.length; i++) {
        this.imagePreview = this.vregislist[i].ccregNikImage;
        this.imagePreview2 = this.vregislist[i].ccregNibImage;
        /*this.imageNikUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.base64String);
        this.imageNibUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.vregislist[i].ccregNibImage);*/
        // this.preview = this.imageNikUrl;
        this.RegisForm.setValue({
          ccregId: this.vregislist[i].ccregId,
          ccregName: this.vregislist[i].ccregName,
          ccregNickName: this.vregislist[i].ccregNickName,
          ccregNationId: this.vregislist[i].ccregNationId,
          ccregNationImgFileName: this.vregislist[i].ccregNationImgFileName,
          ccregNikImage: this.vregislist[i].ccregNikImage,
          ccregNibId: this.vregislist[i].ccregNibId,
          ccregNibImgFileName: this.vregislist[i].ccregNibImgFileName,
          ccregNibImage: this.vregislist[i].ccregNibImage,
          ccregAddress: this.vregislist[i].ccregAddress,
          ccregRt: this.vregislist[i].ccregRt,
          ccregRw: this.vregislist[i].ccregRw,
          ccregProvId: this.vregislist[i].ccregProvId,
          ccregCityId: this.vregislist[i].ccregCityId,
          ccregKecId: this.vregislist[i].ccregKecId,
          ccregKelId: this.vregislist[i].ccregKelId,
          ccregArea: this.vregislist[i].ccregArea,
          ccregZip: this.vregislist[i].ccregZip,
          ccregMobilePhone: this.vregislist[i].ccregMobilePhone,
          ccregPhone: this.vregislist[i].ccregPhone,
          ccregEmail: this.vregislist[i].ccregEmail,
          ccregLongLat: this.vregislist[i].ccregLongLat,
          ccregSentCmbaId: this.vregislist[i].ccregSentCmbaId,
          ccregSentCmbaName: this.vregislist[i].ccregSentCmbaName,
          ccregSentCmbaAccount: this.vregislist[i].ccregSentCmbaAccount,
          ccregRevcCmbaId: this.vregislist[i].ccregRevcCmbaId,
          ccregRecvCmbaName: this.vregislist[i].ccregRecvCmbaName,
          ccregRevcCmbaAccount: this.vregislist[i].ccregRevcCmbaAccount,
          ccregMinApproval: this.vregislist[i].ccregMinApproval,
          ccregPic1Name: this.vregislist[i].ccregPic1Name,
          ccregPic1Phone: this.vregislist[i].ccregPic1Phone,
          ccregPic1Email: this.vregislist[i].ccregPic1Email,
          ccregPic1password: this.vregislist[i].ccregPic1password,
          ccregPic2Name: this.vregislist[i].ccregPic2Name,
          ccregPic2Phone: this.vregislist[i].ccregPic2Phone,
          ccregPic2Email: this.vregislist[i].ccregPic2Email,
          ccregPic2password: this.vregislist[i].ccregPic2password,
          ccregPic3Name: this.vregislist[i].ccregPic3Name,
          ccregPic3Phone: this.vregislist[i].ccregPic3Phone,
          ccregPic3Email: this.vregislist[i].ccregPic3Email,
          ccregPic3password: this.vregislist[i].ccregPic3password
        });
      }

      //const jsonString2 = JSON.stringify(this.vregislist);
      // const formConfig2 = JSON.parse(jsonString2);
      //console.log(formConfig);
      // this.RegisForm = this.formBuider.group(formConfig2);
      //  alert(this.RegisForm.get('ccregName')?.value);
      //  setTimeout(() => {
      //    alert("aaaa : " + this.RegisForm.get('ccregNibImage')?.value); 
      //  }, 10000);


    });
  }

  showSentBank() {
    if (this.bankrcv === true) {
      this.bankrcv = false;
    } else {
      this.bankrcv = true;
    };
  }


  submitRegis() {
    // alert('submitregist: '+this.vusr +'/'+ this.p_regid);
    this.regiServ.SubmitRegistration(this.vusr, this.p_regid)
      .subscribe(
        response => {
          this.requestNumber = response;
          console.log('Submit Succes' + this.requestNumber);
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

  confirmReject() {
    if (confirm("Apakah Anda yakin ingin menolak?")) {
      this.RejectRegis();
    }
  }


  RejectRegis() {
    //let reason = this.RegisForm.get('vreason')?.value;
    alert('reject regist: ' + this.p_regid + '/' + this.RegisForm.get('ccregEmail')?.value + '/' + this.vusr);
    this.regiServ.RejectRegistration(this.p_regid, this.RegisForm.get('ccregEmail')?.value, this.vusr)
      .subscribe(
        response => {
          this.requestNumber = response;
          console.log('Reject Succes' + this.requestNumber);
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

  /*RejectReqDtl(){
           const dialogRef =this.dialog.open(RegistrationCommentComponent,{height:'40%',width:'40%'},);
             dialogRef.afterClosed().subscribe({
               next:(val) =>{
                 if (val) {
                   //this.getListFaktur();
                   //sessionStorage.setItem("dsono", this.dtparam);  
         
                 }
               }
             });        
             //dialogRef.componentInstance.p_usr=this.vusradmin;
             dialogRef.componentInstance.p_type="Update";  
             dialogRef.componentInstance.p_regid=this.p_regid;

           }*/

  getSanitizedImage(base64String: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + base64String);
  }

  openModal(imageSrc: string) {
    this.modalImage = this.getSanitizedImage(imageSrc);
  }

  openModal2(imageSrc: string) {
    this.modalImage2 = this.getSanitizedImage(imageSrc);
  }

}
