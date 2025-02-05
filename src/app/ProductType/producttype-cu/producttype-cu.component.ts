import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CoreMstProductType } from 'src/app/Registration/Models/CoreMstProductType';
import { ServProducttypeService } from 'src/app/Registration/Services/serv-producttype.service';

@Component({
  selector: 'app-producttype-cu',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatIconModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule,
    MatCheckboxModule, MatInputModule, FormsModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './producttype-cu.component.html',
  styleUrls: ['./producttype-cu.component.css']
})
export class ProducttypeCuComponent implements OnInit{

  p_usr: string = "aaaaa";
    p_reqno: string = "aaaaa";
    p_type: string = "aaaaa";
    p_no: string = "aaaaa";
    p_typeno: string = "aaaaa";
    v_no:any;
    preview = '';
    preview2 = '';
    preview3 = '';
    preview4 = '';
    coreTransRequestEcDtl: CoreMstProductType[] = [];
    //prodlist: productlist[] = [];
   // prodtylist: producttypelist[] = [];
    selectedprod: string = "";
    selectedprodtype: string = "";
    selectedFiles: File[] = [];
  
    selectedFile1: any = null;
    file1image?: File;
    file1img: string = "a";
  
    rdtl: CoreMstProductType[] = [];
    dataSource!: MatTableDataSource<any>;
  
    userid: string = 'USER09';
    data: CoreMstProductType = {
    cmprtCmprCode: 0,
    cmprtCode: 0,
    cmprtTypeDesc: "",
    cmprtMeasure: "",
    cmprtSpekGrade: "",
    cmprtTypeAlias: "",
    cmprtImgFilename: "",
    cmprtImgFilepath: "",
    cmprtCreateBy: "",
    cmprtCreateDate: "",
    cmprtUpdateBy: "",
    cmprtUpdateDate: ""
    };
  
    imageUrls: string[] = [];
  
  
    file1: any = null;
    files: File[] = []; // Array untuk menyimpan semua file
    requestNumber: string = '';
  
    constructor(private reqServ: ServProducttypeService, private formBuider: FormBuilder,
      private route: ActivatedRoute,private dialogRef: MatDialogRef<ProducttypeCuComponent>) {
  
    }
    
    closeForm() {
      this.dialogRef.close(true)
    }
  
    ngOnInit(): void {
      console.log("URL:", this.route.url);
      /*this.route.params.subscribe(params => {
        this.p_type = params['param1'];
        this.p_reqno = params['param2'];
        this.p_no = params['param3'];
      });*/
      
      //alert('bbbbbb :' + this.p_type + " ---- " + this.p_reqno+ " --- "+this.p_no);
     // this.getProductList();

     if (this.p_type = 'Insert') {
      this.v_no = this.p_no;
      this.data.cmprtCmprCode = this.v_no;
    }

      if (this.p_type = 'Update') {
        this.p_reqno = this.p_no;
       // alert('update coy'+this.p_reqno)
        this.getProductSingle(this.p_reqno);
      }
    }
  
  
    getProductSingle(req: string) {
      //  alert("customer no :"+this.custcd);
      //alert('cccccc :'+req+" --- "+ this.p_no);
      this.rdtl = [];
     
      this.reqServ.getProdTypeSingle(this.p_no,this.p_typeno).subscribe((res: CoreMstProductType[]) => {
        this.rdtl = res;
       // alert('ddddd :'+req+" --- "+ this.p_no +'/'+this.rdtl.length);
       // this.getProductList();
  
        for (var j = 0; j < this.rdtl.length; j++) {
         // alert('looping');
          this.data.cmprtCmprCode = this.rdtl[j].cmprtCmprCode;
          this.data.cmprtCode = this.rdtl[j].cmprtCode;
          this.data.cmprtTypeDesc = this.rdtl[j].cmprtTypeDesc;
          this.data.cmprtMeasure = this.rdtl[j].cmprtMeasure;
          this.data.cmprtSpekGrade = this.rdtl[j].cmprtSpekGrade;
          this.data.cmprtTypeAlias = this.rdtl[j].cmprtTypeAlias;
          this.data.cmprtImgFilename = this.rdtl[j].cmprtImgFilename;
          this.data.cmprtImgFilepath = this.rdtl[j].cmprtImgFilepath;
          this.data.cmprtCreateBy = this.rdtl[j].cmprtCreateBy;
          this.data.cmprtCreateDate = this.rdtl[j].cmprtCreateDate;
          this.data.cmprtUpdateBy = this.rdtl[j].cmprtUpdateBy;
          this.data.cmprtUpdateDate = this.rdtl[j].cmprtUpdateDate;
          //alert("eeeee :"+this.data.ctecdCtechId+" --- "+this.data.ctecdId);
          //belum ada getimag di service product
         // alert('filename: '+this.data.cmprtImgFilename)
          this.reqServ.getImages(this.p_no,this.p_typeno).subscribe(
            (data: string[]) => {
              this.imageUrls = data;
              if (data.length > 0) {
                this.preview = data[0];
                this.fetchImageAndConvertToFile1(this.preview);
              }
  
            },
            (error: any) => {
              console.error('Error fetching images:', error);
            }
          );
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
  
    onFileSelected(event: any, fileNumber: number) {
      switch (fileNumber) {
        case 1:
          this.preview = '';
          const cfile1 = event.target.files;
          const selectedFil1 = event.target.files;
          this.selectedFile1 = event.target.files[0] as File;
          if (selectedFil1) {
            const fil: File | null = selectedFil1.item(0);
            if (fil) {
              this.preview = '';
              this.file1image = fil;
              this.file1img = this.file1image.name;
              const reader = new FileReader();
  
              reader.onload = (e: any) => {
                console.log(e.target.result);
                this.preview = e.target.result;
              };
  
              reader.readAsDataURL(this.file1image);
            }
          }
          break;
      }
    }
  
  
    submitProdType() {
      if (this.p_type == 'Insert') {
        //alert('new');
        this.reqServ.SaveCreateProductType(this.userid, this.data, this.selectedFile1)
          .subscribe(
            response => {
              this.requestNumber = response;
              console.log('Request berhasil dibuat dengan nomor:', this.requestNumber);
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
      } else {
        //alert('update');
        
        this.reqServ.UpdateProductType(this.data.cmprtCmprCode.toString(),this.data.cmprtCode.toString(), this.userid, this.data, this.selectedFile1)
          .subscribe(
            response => {
              this.requestNumber = response;
              console.log('Request berhasil dibuat dengan nomor:', this.requestNumber);
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
      }
      this.closeForm();
    }
  
    delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

}
