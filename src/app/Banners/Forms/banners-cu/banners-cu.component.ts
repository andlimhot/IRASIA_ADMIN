import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { bannersmdl } from '../../Models/bannersmdl';
import { ServBannersService } from '../../Services/serv-banners.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-banners-cu',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatIconModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule,
    MatCheckboxModule, MatInputModule, FormsModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './banners-cu.component.html',
  styleUrls: ['./banners-cu.component.css']
})
export class BannersCuComponent implements OnInit{

  p_usr: string = "aaaaa";
    p_reqno: any;
    p_type: string = "aaaaa";
    p_no: any;
    preview = '';
    preview2 = '';
    preview3 = '';
    preview4 = '';
    coreTransRequestEcDtl: bannersmdl[] = [];
    //prodlist: productlist[] = [];
   // prodtylist: producttypelist[] = [];
    selectedprod: string = "";
    selectedprodtype: string = "";
    selectedFiles: File[] = [];
  
    selectedFile1: any = null;
    file1image?: File;
    file1img: string = "a";
  
    rdtl: bannersmdl[] = [];
    dataSource!: MatTableDataSource<any>;
  
    userid: string = 'USER09';
    data: bannersmdl = {
      cmbannId: 0,
      cmbannFileName: "",
      cmbannFilePath: "",
    };
  
    imageUrls: string[] = [];
  
  
    file1: any = null;
    files: File[] = []; // Array untuk menyimpan semua file
    BannerNumber: string = '';
  
    constructor(private reqServ: ServBannersService, private formBuider: FormBuilder,
      private route: ActivatedRoute,private dialogRef: MatDialogRef<BannersCuComponent>) {
  
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
      
     // alert('bbbbbb :' + this.p_type + " ---- " + this.p_reqno+ " --- "+this.p_no);
     // this.getProductList();
     
      if (this.p_type = 'Update') {
        this.p_reqno = this.p_no;
        alert('update coy'+this.p_reqno)
        this.getBannerSingle(this.p_reqno);
      }
    }
  
  
    getBannerSingle(req: string) {
      //  alert("customer no :"+this.custcd);
      //alert('cccccc :'+req+" --- "+ this.p_no);
      this.rdtl = [];
     
      this.reqServ.getBannerSingle(this.p_no).subscribe((res: bannersmdl[]) => {
        this.rdtl = res;
        //alert('ddddd :'+req+" --- "+ this.p_no +'/'+this.rdtl.length);
  
        for (var j = 0; j < this.rdtl.length; j++) {
         // alert('looping');
          this.data.cmbannId = this.rdtl[j].cmbannId;
          this.data.cmbannFileName = this.rdtl[j].cmbannFileName;
          this.data.cmbannFilePath = this.rdtl[j].cmbannFilePath;
          alert("bannercodeeee :"+this.p_no);
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
  
  
    submitBanners() {
      if (this.p_type == 'Insert') {
       // alert('new');
        this.reqServ.SaveCreateBanner(this.userid, this.data, this.selectedFile1)
          .subscribe(
            response => {
              this.BannerNumber = response;
              console.log('Request berhasil dibuat dengan nomor:', this.BannerNumber);
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
        
        this.reqServ.UpdateBanner(this.data.cmbannId.toString(), this.userid, this.data, this.selectedFile1)
          .subscribe(
            response => {
              this.BannerNumber = response;
              console.log('Request berhasil dibuat dengan nomor:', this.BannerNumber);
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
