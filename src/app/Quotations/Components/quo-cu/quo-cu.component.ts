import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ServQuoService } from '../../Services/serv-quo.service';
import { QuotationHdr } from '../../Models/QuotationHdr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ServLoginService } from 'src/app/login/Services/serv-login.service';
import { ProductProducttypeServService } from 'src/app/RequestEC/Services/product-producttype-serv.service';
import { QuoCuCommentComponent } from '../quo-cu-comment/quo-cu-comment.component';

@Component({
  selector: 'app-quo-cu',
  imports: [CommonModule, MatTabsModule, MatIconModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule,
    MatCheckboxModule, MatInputModule, FormsModule,],
  standalone: true,
  templateUrl: './quo-cu.component.html',
  styleUrls: ['./quo-cu.component.css']
})
export class QuoCuComponent implements OnInit {
  vquhdr:QuotationHdr[]=[];
  p_usr: string = "aaaaa";
  p_quono: string = "aaaaa";
  p_type: string = "aaaaa";
  vQuoNo : string="aaaa";
  vtkn:any;
  vtknd:any;
  vusr:any;
  vusrd:any;
  userid: string = 'USER09';
  ctqhNotesValue: string = '';
  forms: FormGroup;
  fileName1: string | null = null;
  fileName2: string | null = null;
  //imagePreview1: string | ArrayBuffer | null = null;
  imagePreview1: string | null = null;
  //imagePreview2: string | ArrayBuffer | null = null;
  imagePreview2: string | null = null;
  selectedFile1: any ;
  selectedFile2: any;
  file1image?: File;
  file1img: string = "a";
  files: File[] = []; 
  file1: any = null;
  file2: any = null;
  file2image?: File;
  file2img: string = "a";
  imageUrls: string[] = [];
  requestNumber: string = '';
  vusrnm:any="";
 vusrurl:any="";
 vusnm:any="";
 vusurl:any="";

 modalImage: string | null = null;
 modalImage2: string | null = null;

  constructor(private _vquoserv:ServQuoService, private formBuider: FormBuilder,  private dialogRef: MatDialogRef<QuoCuComponent>,
      private route: ActivatedRoute, private masterserv: ProductProducttypeServService, private logserv:ServLoginService,private dialog:MatDialog,){  
        this.forms = this.formBuider.group({
          ctqhId: '',
          ctqhDate: '',
          ctqhType: '',
          ctqhStatus: '',
          ctqhSendDate: '',
          ctqhCcustCusno: '',
          ctqhPic1Cusno:'',
          ctqhPic1Date: '',
          ctqhPic1Sts: '',
          ctqhPic2Cusno: '',
          ctqhPic2Date: '',
          ctqhPic2Sts: '',
          ctqhPic3Cusno: '',
          ctqhPic3Date: '',
          ctqhPic3Sts: '',
          ctqhCreateBy: '',
          ctqhCreateDate: '',
          ctqhUpdateBy: '',
          ctqhUpdateDate: '',
          ctqhNotes: '',
          ctqhReason: '',
          ctqhDlvrAddrId: '',
          ctqhOrderId: '',
          ctqhOrderDate: '',
          ctqhUpdateByAdmin: '',
          ctqhUpdateDateAdmin: '',
          ctqhProductName:'',
          ctqhQty:''
        });         
  }

  ngOnInit(): void {
    this.vusrnm=sessionStorage.getItem('usnm');
    this.vusrd=sessionStorage.getItem('uscd');
    this.vusnm=this.logserv.decrypt(this.vusrnm);   
    this.vusr=this.logserv.decrypt(this.vusrd);
    //this.vtkn=this.logserv.decrypt(this.vtknd);  
   // alert("111111 :"+this.p_usr + " 111111 : "+this.p_quono+" 11111 : "+this.p_type );
  // alert('quocoinit');
    if (this.p_type === 'Update') {
     // alert('ifquoinit');
      this.getQuoByIdUser();
    }    
  };

  closeForm() {
    this.dialogRef.close(true)
  }
 
  getQuoByIdUser(){
    this.vquhdr=[];    
     this._vquoserv.getQuoListByIdUser(this.p_usr,this.p_quono, this.vtkn).subscribe((res: QuotationHdr[]) => {
          this.vquhdr = res;
       //   const jsonString2 = JSON.stringify(this.vquhdr);
       //   const formConfig2 = JSON.parse(jsonString2);
          //console.log(formConfig);
       //   this.forms = this.formBuider.group(formConfig2);
       for (let ct in this.vquhdr) {
        try {
          this.forms.setValue({
            ctqhId: this.vquhdr[ct].ctqhId,
            ctqhDate: this.vquhdr[ct].ctqhDate,
            ctqhType: this.vquhdr[ct].ctqhType,
            ctqhStatus: this.vquhdr[ct].ctqhStatus,
            ctqhSendDate: this.vquhdr[ct].ctqhSendDate,
            ctqhCcustCusno: this.vquhdr[ct].ctqhCcustCusno,
            ctqhPic1Cusno: this.vquhdr[ct].ctqhPic1Cusno,
            ctqhPic1Date: this.vquhdr[ct].ctqhPic1Date,
            ctqhPic1Sts: this.vquhdr[ct].ctqhPic1Sts,
            ctqhPic2Cusno: this.vquhdr[ct].ctqhPic2Cusno,
            ctqhPic2Date: this.vquhdr[ct].ctqhPic2Date,
            ctqhPic2Sts: this.vquhdr[ct].ctqhPic2Sts,
            ctqhPic3Cusno: this.vquhdr[ct].ctqhPic3Cusno,
            ctqhPic3Date: this.vquhdr[ct].ctqhPic3Date,
            ctqhPic3Sts: this.vquhdr[ct].ctqhPic3Sts,
            ctqhCreateBy: this.vquhdr[ct].ctqhCreateBy,
            ctqhCreateDate: this.vquhdr[ct].ctqhCreateDate,
            ctqhUpdateBy: this.vquhdr[ct].ctqhUpdateBy,
            ctqhUpdateDate: this.vquhdr[ct].ctqhUpdateDate,
            ctqhNotes: this.vquhdr[ct].ctqhNotes,
            ctqhReason: this.vquhdr[ct].ctqhReason,
            ctqhDlvrAddrId: this.vquhdr[ct].ctqhDlvrAddrId,
            ctqhOrderId: this.vquhdr[ct].ctqhOrderId,
            ctqhOrderDate: this.vquhdr[ct].ctqhOrderDate,
            ctqhUpdateByAdmin: this.vquhdr[ct].ctqhUpdateByAdmin,
            ctqhUpdateDateAdmin: this.vquhdr[ct].ctqhUpdateDateAdmin,
            ctqhProductName:this.vquhdr[ct].ctqhProductName,
            ctqhQty:this.vquhdr[ct].ctqhQty
          });

          this._vquoserv.getImagesquoHdr(this.p_usr, this.forms.get("ctqhId")?.value,  this.p_usr, this.vtkn).subscribe(
            (data: string[]) => {
              this.imageUrls = data;
              if (data.length > 0) {
                this.imagePreview1 = data[0];
                this.fetchImageAndConvertToFile1(this.imagePreview1);
              }
              if (data.length > 1) {
                this.imagePreview2 = data[1];
                this.fetchImageAndConvertToFile2(this.imagePreview2);
              };
            },
            (error) => {
              console.error('Error fetching images:', error);
            }
          );

        }
        catch (err) {
          alert("error :" + err);
        }
      }
        });
  }
  
  fetchImageAndConvertToFile1(imageUrl: string) {
      fetch(imageUrl)
        .then(res => res.blob())
        .then(blob => {
          const urlParts = imageUrl.split('/');
          const filename1 = urlParts[urlParts.length - 1];
          this.file1img = filename1;
          const file = new File([blob], filename1, { type: 'image/jpeg' });
          this.files.push(file);
  
          // Memisahkan file ke variabel terpisah
          if (this.files.length === 1) {
            this.selectedFile1 = this.files[0];
            this.file1=this.selectedFile1;
          }
        });
    }
  
    fetchImageAndConvertToFile2(imageUrl: string) {
      fetch(imageUrl)
        .then(res => res.blob())
        .then(blob => {
          const urlParts = imageUrl.split('/');
          const filename2 = urlParts[urlParts.length - 1];
          this.file2img = filename2;
          const file = new File([blob], filename2, { type: 'image/jpeg' });
          this.files.push(file);
  
          // Memisahkan file ke variabel terpisah
          if (this.files.length === 1) {
            this.selectedFile2 = this.files[0];
            this.file2=this.selectedFile2;
          }
        });
    }

  submitRequest() {
    var str = new Date().setSeconds(0,0);
    var dt = new Date(str).toISOString();
    if (this.p_type === 'Insert') {    
     this.forms.patchValue({
        ctqhType: 'W',
          ctqhStatus: 'SQ',
          ctqhCcustCusno:  this.userid,
          ctqhCreateBy :this.userid,
	        ctqhCreateDate:dt
    });

    this._vquoserv.createQuoHdr(this.userid, this.forms.value, this.selectedFile1, this.selectedFile2)
          .subscribe(
            response => {
            
              this.vQuoNo = response;
              alert('Quotation berhasil dibuat dengan nomor:'+ this.vQuoNo);
              
             
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
     /* this._vquoserv.QuoSaveHdr(this.forms.value)
        .subscribe(
          response => {          
            this.vQuoNo = response;
            console.log('Quotation berhasil dibuat dengan nomor:', this.vQuoNo);
            alert('Quotation berhasil dibuat dengan nomor: '+ this.vQuoNo);
            this.closeForm();
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
        );*/
       this.closeForm();     
    } 

    if (this.p_type === 'Update') {
        this._vquoserv.QuoSaveHdr(this.forms.value)
        .subscribe(
          response => {          
            this.vQuoNo = response;
            console.log('update success:', this.vQuoNo);
            alert('Quotation Updated');
            this.closeForm();
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
      this.closeForm();     
    }
  }
  
  onFileSelected1(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;

    if (fileList && fileList.length > 0) {
      const file = fileList[0];
       this.selectedFile1=file;
      // Validasi tipe file (opsional tapi bagus)
      if (!file.type.startsWith('image/')) {
        console.error('File yang dipilih bukan gambar.');
        this.forms.patchValue({ image1: null });
        this.fileName1 = 'Bukan gambar';
        this.imagePreview1 = null; // Reset preview
        element.value = ''; // Reset input file
        return; // Hentikan proses jika bukan gambar
      }

      this.forms.patchValue({ image1: file });
      this.fileName1 = file.name;

      // --- TAMBAHKAN LOGIKA FileReader ---
      const reader = new FileReader();
      reader.onload = () => {
       // this.imagePreview1 = reader.result; // Simpan Data URL ke properti preview
      };
       reader.onerror = (error) => {
           console.error('FileReader error: ', error);
           this.imagePreview1 = null; // Hapus preview jika ada error baca
       };
      reader.readAsDataURL(file); // Baca file sebagai Data URL
      // ------------------------------------

      console.log('File 1 selected:', file);
    } else {
      // Reset jika tidak ada file dipilih (misal, user klik cancel)
      this.forms.patchValue({ image1: null });
      this.fileName1 = null;
      this.imagePreview1 = null; // Reset preview
    }
  }

  onFileSelected2(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;

    if (fileList && fileList.length > 0) {
      const file = fileList[0];
       this.selectedFile1=file;
       if (!file.type.startsWith('image/')) {
        console.error('File yang dipilih bukan gambar.');
        this.forms.patchValue({ image2: null });
        this.fileName2 = 'Bukan gambar';
        this.imagePreview2 = null;
        element.value = '';
        return;
      }

      this.forms.patchValue({ image2: file });
      this.fileName2 = file.name;

      // --- TAMBAHKAN LOGIKA FileReader ---
      const reader = new FileReader();
      reader.onload = () => {
        //this.imagePreview2 = reader.result; // Simpan Data URL
      };
       reader.onerror = (error) => {
           console.error('FileReader error: ', error);
           this.imagePreview2 = null;
       };
      reader.readAsDataURL(file);
      // ------------------------------------

      console.log('File 2 selected:', file);
    } else {
      this.forms.patchValue({ image2: null });
      this.fileName2 = null;
      this.imagePreview2 = null; // Reset preview
    }
  }

  CallProcQuoToBlast() {
    alert('sendtoweb: '+this.p_quono+'/'+this.vusr);
   this._vquoserv.ProcQuoToBalst(this.p_quono,this.vusr)
        .subscribe(
          response => {
            this.requestNumber = response;
            console.log('Send To web berhasil dibuat dengan nomor:', this.requestNumber);
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

  openModal(imageSrc: string) {
    this.modalImage = imageSrc;
  }

  openModal2(imageSrc: string) {
    this.modalImage2 = imageSrc;
  }

  RejectQuo(){       
            //this._router.navigate(['RequestUpdList', tipe,reqno]);
      const dialogRef =this.dialog.open(QuoCuCommentComponent,{ height: '40%', width: '40%' },);
            dialogRef.afterClosed().subscribe({
                next:(val) =>{
                      if (val) {
                        this.getQuoByIdUser();              
                      }
                    }
                  });      
    //dialogRef.componentInstance.p_usr=p_user;
    dialogRef.componentInstance.p_quono=this.p_quono;
    dialogRef.componentInstance.p_type='Update';
  }

}
