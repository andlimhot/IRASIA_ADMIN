import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { employeemdl } from '../../Models/employeemdl';
import { ServEmployeeService } from '../../Services/serv-employee.service';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { provincemdl } from 'src/app/Registration/Models/provincemdl';
import { citymdl } from 'src/app/Registration/Models/citymdl';
import { kecamatanmdl } from 'src/app/Registration/Models/kecamatanmdl';
import { kelurahanmdl } from 'src/app/Registration/Models/kelurahanmdl';

@Component({
  selector: 'app-employee-cu',
  standalone: true,
  imports: [MatCardModule, MatToolbarModule, MatDialogModule, MatFormFieldModule,
      MatInputModule, ReactiveFormsModule, MatButtonModule, CommonModule, MatSelectModule, MatTableModule,
      FormsModule, MatDatepickerModule, MatCheckboxModule, MatSortModule, MatPaginatorModule,
      MatNativeDateModule, MatIconModule, MatAutocompleteModule, MatTabsModule
      ],
  templateUrl: './employee-cu.component.html',
  styleUrls: ['./employee-cu.component.css']
})
export class EmployeeCuComponent implements OnInit {

  p_usr: string = "aaaaa";
    p_reqno: string = "aaaaa";
    p_type: string = "aaaaa";
    p_no: string = "aaaaa";
    preview = '';
    preview2 = '';
    preview3 = '';
    preview4 = '';
    coreTransRequestEcDtl: employeemdl[] = [];
    //prodlist: productlist[] = [];
   // prodtylist: producttypelist[] = [];
    selectedprod: string = "";
    selectedprodtype: string = "";
    selectedFiles: File[] = [];
  
    selectedFile1: any = null;
    file1image?: File;
    file1img: string = "a";

    provlist:provincemdl[]=[];
    citylist:citymdl[]=[];
    keclist:kecamatanmdl[]=[];
    kellist:kelurahanmdl[]=[];
    selectedprov: string = 'a';
    selectedcity: string = 'a';
    selectedkec: string = 'a';
    selectedkel: string = 'a';
    p_provcode: string ='';
    p_citycode: string ='';
    p_keccode: string ='';
  
    rdtl: employeemdl[] = [];
    dataSource!: MatTableDataSource<any>;
  
    userid: string = 'USER09';
    data: employeemdl = {
    cmeEmplNik: "",
    cmeEmplName: "",
    cmeEmplBirthDate: "",
    cmeEmplBirthPlace: "",
    cmeEmplAddress: "",
    cmeEmplRt: "",
    cmeEmplRw: "",
    cmeEmplProvCode: "",
    cmeEmplCityCode: "",
    cmeEmplKecCode: "",
    cmeEmplKelCode: "",
    cmeEmplZipCode: "",
    cmeEmplHandphone: "",
    cmeEmplEmail: "",
    cmeUsername: "",
    cmePassword: "",
    cmeActiveDate: "",
    cmeResignDate: "",
    cmeIdNo: "",
    cmeJobLevel: 0,
    cmeSubLevel: 0,
    cmeDescription: "",
    cmeUpLevel: 0,
    cmeUpSubLevel: 0,
    cmePjsEmplCode: "",
    cmeCreateBy: "",
    cmeCreateDate: "",
    cmeUpdateBy: "",
    cmeUpdateDate: "",
    cmeIdCtpicRefNo: 0,
    cmeIdCtpicSeqNo: 0,
    cmeImgFileName: "",
    cmeImgFilePath: ""
    };
  
    imageUrls: string[] = [];
  
  
    file1: any = null;
    files: File[] = []; // Array untuk menyimpan semua file
    requestNumber: string = '';
  
    constructor(private reqServ: ServEmployeeService, private formBuider: FormBuilder,
      private route: ActivatedRoute,private dialogRef: MatDialogRef<EmployeeCuComponent>) {
  
    }
    
    closeForm() {
      this.dialogRef.close(true)
    }
  
    ngOnInit(): void {
      console.log("URL:", this.route.url);
      this.getprovince();
      /*this.route.params.subscribe(params => {
        this.p_type = params['param1'];
        this.p_reqno = params['param2'];
        this.p_no = params['param3'];
      });*/
      
     // alert('bbbbbb :' + this.p_type + " ---- " + this.p_reqno+ " --- "+this.p_no);
     // this.getProductList();
     
      if (this.p_type = 'Update') {
        this.p_reqno = this.p_no;
        alert('update coy'+this.p_reqno)
        this.getProductSingle(this.p_reqno);
        
        this.getprovince();
        this.getcity(this.p_provcode);
        this.getkecamatan(this.p_citycode);
        this.getkelurahan(this.p_keccode);

      }
    }

    changeprov(value: any) {
      //alert('chageprov');
      this.citylist=[];
      this.keclist = [];  
      this.kellist = [];  
      this.selectedprov = value;
      this.getcity(this.selectedprov);
      alert('provcode: ' + this.data.cmeEmplProvCode)
    }
  
    getprovince() {
      this.provlist = [];
      this.reqServ.getProvinceALL().subscribe((res: provincemdl[]) => {
        this.provlist = res;   
        console.log(this.provlist.length);
      });
    }
  
    changecity(value: any) {
      this.keclist = [];  
      this.kellist = [];  
      this.selectedcity = value;
      this.getkecamatan(this.selectedcity);
    }
  
    changekecamatan(value: any) {
      this.kellist = [];  
      this.selectedkec = value;
      this.getkelurahan(this.selectedkec);
      alert('keccode: '+this.selectedkec);
    }
  
    getcity(ct:string) {
      this.citylist = [];
      this.reqServ.getcitybyprovALL(ct).subscribe((res: citymdl[]) => {
        this.citylist = res;   
      });
    }
  
    changekelurahan(value: any) {
      this.selectedkel = value;
    }
  
    getkecamatan(kc:string) {
      this.keclist = [];  
      this.reqServ.getKecbyCityALL(kc).subscribe((res: kecamatanmdl[]) => {
        this.keclist = res;   
      });
    }
  
    getkelurahan(kl:string) {
      this.kellist = [];  
      this.reqServ.getKelbyKecALL(kl).subscribe((res: kelurahanmdl[]) => {
        this.kellist = res;   
      });
    }
  
  
    getProductSingle(req: string) {
      //  alert("customer no :"+this.custcd);
      //alert('cccccc :'+req+" --- "+ this.p_no);
      this.rdtl = [];
     
      this.reqServ.getEmplSingle(this.p_no).subscribe((res: employeemdl[]) => {
        this.rdtl = res;
        //alert('ddddd :'+req+" --- "+ this.p_no +'/'+this.rdtl.length);
  
        for (var j = 0; j < this.rdtl.length; j++) {
         // alert('looping');
          this.data.cmeEmplNik = this.rdtl[j].cmeEmplNik;
          this.data.cmeEmplName= this.rdtl[j].cmeEmplName;
          this.data.cmeEmplBirthDate= this.rdtl[j].cmeEmplBirthDate; 
          this.data.cmeEmplBirthPlace= this.rdtl[j].cmeEmplBirthPlace;
          this.data.cmeEmplAddress= this.rdtl[j].cmeEmplAddress;
          this.data.cmeEmplRt= this.rdtl[j].cmeEmplRt; 
          this.data.cmeEmplRw= this.rdtl[j].cmeEmplRw;
          this.data.cmeEmplProvCode= this.rdtl[j].cmeEmplProvCode;
          this.data.cmeEmplCityCode= this.rdtl[j].cmeEmplCityCode;
          this.data.cmeEmplKecCode= this.rdtl[j].cmeEmplKecCode;
          this.data.cmeEmplKelCode= this.rdtl[j].cmeEmplKelCode;
          this.data.cmeEmplZipCode= this.rdtl[j].cmeEmplZipCode;
          this.data.cmeEmplHandphone= this.rdtl[j].cmeEmplHandphone;
          this.data.cmeEmplEmail= this.rdtl[j].cmeEmplEmail;
          this.data.cmeUsername= this.rdtl[j].cmeUsername;
          this.data.cmePassword= this.rdtl[j].cmePassword;
          this.data.cmeActiveDate= this.rdtl[j].cmeActiveDate;
          this.data.cmeResignDate= this.rdtl[j].cmeResignDate;
          this.data.cmeIdNo= this.rdtl[j].cmeIdNo;
          this.data.cmeJobLevel= this.rdtl[j].cmeJobLevel;
          this.data.cmeSubLevel= this.rdtl[j].cmeSubLevel;
          this.data.cmeDescription= this.rdtl[j].cmeDescription;
          this.data.cmeUpLevel= this.rdtl[j].cmeUpLevel;
          this.data.cmeUpSubLevel= this.rdtl[j].cmeUpSubLevel; 
          this.data.cmePjsEmplCode= this.rdtl[j].cmePjsEmplCode;
          this.data.cmeCreateBy= this.rdtl[j].cmeCreateBy;
          this.data.cmeCreateDate= this.rdtl[j].cmeCreateDate;
          this.data.cmeUpdateBy= this.rdtl[j].cmeUpdateBy;
          this.data.cmeUpdateDate= this.rdtl[j].cmeUpdateDate;
          this.data.cmeIdCtpicRefNo= this.rdtl[j].cmeIdCtpicRefNo;
          this.data.cmeIdCtpicSeqNo= this.rdtl[j].cmeIdCtpicSeqNo;
          this.data.cmeImgFileName= this.rdtl[j].cmeImgFileName;
          this.data.cmeImgFilePath= this.rdtl[j].cmeImgFilePath;
          //alert("eeeee :"+this.data.ctecdCtechId+" --- "+this.data.ctecdId);
          this.reqServ.getImages(this.p_no).subscribe(
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
  
  
    submitProducts() {
      if (this.p_type == 'Insert') {
       // alert('new');
        this.reqServ.SaveCreateEmpl(this.userid, this.data, this.selectedFile1)
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
       // alert('update');
        
        this.reqServ.UpdateEmpl(this.data.cmeEmplNik.toString(), this.userid, this.data, this.selectedFile1)
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
      //this.closeForm();
    }
  
    delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
 

}
