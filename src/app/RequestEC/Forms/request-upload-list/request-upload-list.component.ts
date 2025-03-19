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
import { RequestDtl } from '../../Models/RequestDtl';
import { CoreMstProduct } from 'src/app/Registration/Models/CoreMstProduct';
import { MatTableDataSource } from '@angular/material/table';
import { RequestServService } from '../../Services/request-serv.service';
import { ProductProducttypeServService } from '../../Services/product-producttype-serv.service';
import { CoreMstProductType } from 'src/app/Registration/Models/CoreMstProductType';

@Component({
  selector: 'app-request-upload-list',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatIconModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule,
    MatCheckboxModule, MatInputModule, FormsModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './request-upload-list.component.html',
  styleUrls: ['./request-upload-list.component.css']
})


export class RequestUploadListComponent implements OnInit{

  p_usr: string = "aaaaa";
  p_reqno: string = "aaaaa";
  p_type: string = "aaaaa";
  p_no: string = "aaaaa";
  pin_reqno: string = "aaaaa";
  pin_no: string = "aaaaa";
  preview = '';
  preview2 = '';
  preview3 = '';
  preview4 = '';
  coreTransRequestEcDtl: RequestDtl[] = [];
  prodlist: CoreMstProduct[] = [];
  prodtylist: CoreMstProductType[] = [];
  selectedprod: string = "";
  selectedprodtype: string = "";
  selectedFiles: File[] = [];

  selectedFile1: any = null;
  file1image?: File;
  file1img: string = "a";

  selectedFile2: any = null;
  file2image?: File;
  file2img: string = "a";

  selectedFile3: any = null;
  file3image?: File;
  file3img: string = "a";

  selectedFile4: any = null;
  file4image?: File;
  file4img: string = "a";

  secretKey: string="12!@#$%abgz123";
  vtkn:any;
  vtknd:any;
  vusr:any;
  vusrd:any;

  vactive = false;
  vacbestprod = false;
  vacnewprod = false;
  vactsale = false;

  rdtl: RequestDtl[] = [];
  dataSource!: MatTableDataSource<any>;

  userid: string = 'USER09';
  data: RequestDtl = {
    ctecdCtechId: "",
    ctecdId: "",
    ctecdProductCode: "",
    ctecdProductName: "",
    ctecdProducttypeCode: "",
    ctecdProducttypeName: "",
    ctecdProducttypeStockQty: 0,
    ctecdProducttypeMinQty: 0,
    ctecdProducttypePrice: 0,
    ctecdProducttypeRangeQty1: 0,
    ctecdProducttypeRangePrice1: 0,
    ctecdProducttypeRangeQty2: 0,
    ctecdProducttypeRangePrice2: 0,
    ctecdProducttypeDesc: "",
    ctecdProductTypeSize: "",
    ctecdProductTypeSpec: "",
    ctecdProductTypeAlias: "",
    ctecdProdTypeImg1Filename: "",
    ctecdProdTypeImg1Filepath: "",
    ctecdProdTypeImg2Filename: "",
    ctecdProdTypeImg2Filepath: "",
    ctecdProdTypeImg3Filename: "",
    ctecdProdTypeImg3Filepath: "",
    ctecdProdTypeImg4Filename: "",
    ctecdProdTypeImg4Filepath: "",
    ctecdNewUsed: "",
    ctecdStatus: "",
    ctecdReason: "",
    ctecdCreateBy: "",
    ctecdCreateDate: "",
    ctecdUpdateBy: "",
    ctecdUpdateDate: "",
    ctecdBestPrice: "",
    ctecdBestProduct: "",
    ctecdNewProduct: "",
    ctecdSale: "",
    ctecdImg1CtpicRefNo: "",
    ctecdImg1CtpicSeqNo: "",
    ctecdImg2CtpicRefNo: "",
    ctecdImg2CtpicSeqNo: "",
    ctecdImg3CtpicRefNo: "",
    ctecdImg3CtpicSeqNo: "",
    ctecdImg4CtpicRefNo: "",
    ctecdImg4CtpicSeqNo: ""
  };

  imageUrls: string[] = [];


  file1: any = null;
  file2: any = null;
  file3: any = null;
  file4: any = null;
  files: File[] = []; // Array untuk menyimpan semua file
  requestNumber: string = '';

  constructor(private reqServ: RequestServService, private formBuider: FormBuilder,
    private route: ActivatedRoute, private masterserv: ProductProducttypeServService) {

  }


  ngOnInit(): void {
    this.vusrd=sessionStorage.getItem('usr');
    this.vtknd=sessionStorage.getItem('tkn');
    //this.vusr=this.decrypt(this.vusrd);
   // this.vtkn=this.decrypt(this.vtknd);
    console.log("URL:", this.route.url);
    /*this.route.params.subscribe(params => {
      this.p_type = params['param1'];
      this.p_reqno = params['param2'];
      this.p_no = params['param3'];
    });*/
    
    alert('bbbbbb :' + this.p_type + " ---- " + this.p_reqno+ " --- "+this.p_no);
    this.getProductList();
    if (this.p_type = 'Update') {
      this.getRequestDtl(this.p_reqno);
    }
  }

  changeproduct() {
    this.prodtylist = [];
    this.getProducttypeList(this.selectedprod);

  }

  getProductList() {
    this.prodtylist = [];
    this.masterserv.getProductList().subscribe((res: CoreMstProduct[]) => {
      this.prodlist = res;
    });
  }

  getProducttypeList(value: any) {
    this.prodtylist = [];

    this.masterserv.getProductTypeList(value).subscribe((res: CoreMstProductType[]) => {
      this.prodtylist = res;
    });

  }

  getRequestDtl(req: string) {
    //  alert("customer no :"+this.custcd);
    alert('cccccc :'+req+" --- "+ this.p_no);
    this.rdtl = [];
   
    this.reqServ.getReqEcByIdNo(req, this.p_no, this.vusr, this.vtkn).subscribe((res: RequestDtl[]) => {
      this.rdtl = res;
      this.getProductList();

      for (var j = 0; j < this.rdtl.length; j++) {
        this.selectedprod = this.rdtl[j].ctecdProductCode;
        this.getProducttypeList(this.selectedprod);
        this.selectedprodtype = this.rdtl[j].ctecdProducttypeCode;
        this.data.ctecdCtechId = this.rdtl[j].ctecdCtechId;
        this.data.ctecdId = this.rdtl[j].ctecdId;
        this.data.ctecdProductCode = this.rdtl[j].ctecdProductCode;
        this.data.ctecdProducttypeCode = this.rdtl[j].ctecdProducttypeCode;
        this.data.ctecdProductName = this.rdtl[j].ctecdProductName;
        this.data.ctecdProducttypeName = this.rdtl[j].ctecdProducttypeName;
        this.data.ctecdProductTypeAlias = this.rdtl[j].ctecdProductTypeAlias;
        this.data.ctecdProducttypeStockQty = this.rdtl[j].ctecdProducttypeStockQty;
        this.data.ctecdProducttypePrice = this.rdtl[j].ctecdProducttypePrice;
        this.data.ctecdProducttypeMinQty = this.rdtl[j].ctecdProducttypeMinQty;
        this.data.ctecdProductTypeSize = this.rdtl[j].ctecdProductTypeSize;
        this.data.ctecdProductTypeSpec = this.rdtl[j].ctecdProductTypeSpec;
        this.data.ctecdProducttypeDesc = this.rdtl[j].ctecdProducttypeDesc;
        this.data.ctecdBestPrice = this.rdtl[j].ctecdBestPrice;
        alert('Bestprice: '+this.data.ctecdBestPrice)
        if (this.data.ctecdBestPrice === 'Y') {
          this.vactive = true;
        }
        else {
          this.vactive = false
        }

        this.data.ctecdBestProduct = this.rdtl[j].ctecdBestProduct;
        if (this.data.ctecdBestProduct === 'Y') {
          this.vacbestprod = true;
        }
        else {
          this.vacbestprod = false
        }

        this.data.ctecdNewProduct = this.rdtl[j].ctecdNewProduct;
        if (this.data.ctecdNewProduct === 'Y') {
          this.vacnewprod = true;
        }
        else {
          this.vacnewprod = false
        }

        this.data.ctecdSale = this.rdtl[j].ctecdSale;
        if (this.data.ctecdSale === 'Y') {
          this.vactsale = true;
        }
        else {
          this.vactsale = false
        }
        this.data.ctecdProdTypeImg1Filename = this.rdtl[j].ctecdProdTypeImg1Filename;
        this.data.ctecdProdTypeImg2Filename = this.rdtl[j].ctecdProdTypeImg2Filename;
        this.data.ctecdProdTypeImg3Filename = this.rdtl[j].ctecdProdTypeImg3Filename;
        this.data.ctecdProdTypeImg4Filename = this.rdtl[j].ctecdProdTypeImg4Filename;
        this.data.ctecdProdTypeImg1Filepath=this.rdtl[j].ctecdProdTypeImg1Filepath;
        this.data.ctecdProdTypeImg2Filepath=this.rdtl[j].ctecdProdTypeImg2Filepath;
        this.data.ctecdProdTypeImg3Filepath=this.rdtl[j].ctecdProdTypeImg3Filepath;
        this.data.ctecdProdTypeImg4Filepath=this.rdtl[j].ctecdProdTypeImg4Filepath;
        alert("eeeee :"+this.data.ctecdCtechId+" --- "+this.data.ctecdId);
        this.reqServ.getImages(this.vusr, this.data.ctecdCtechId, this.data.ctecdId, this.vusr, this.vtkn).subscribe(
          (data: string[]) => {
            this.imageUrls = data;
            if (data.length > 0) {
              this.preview = data[0];
              this.fetchImageAndConvertToFile1(this.preview);
            }
            if (data.length > 1) {
              this.preview2 = data[1];
              this.fetchImageAndConvertToFile2(this.preview2);
            };
            if (data.length > 2) {
              this.preview3 = data[2];
              this.fetchImageAndConvertToFile3(this.preview3);
            }
            if (data.length > 3) {
              this.preview4 = data[3];
              this.fetchImageAndConvertToFile4(this.preview4);
            }

          },
          (error) => {
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

  fetchImageAndConvertToFile3(imageUrl: string) {
    fetch(imageUrl)
      .then(res => res.blob())
      .then(blob => {
        const urlParts = imageUrl.split('/');
        const filename3=urlParts[urlParts.length - 1];
        this.file3img = filename3;
        const file = new File([blob], filename3, { type: 'image/jpeg' });
        this.files.push(file);

        // Memisahkan file ke variabel terpisah
        if (this.files.length === 1) {
          this.selectedFile3 = this.files[0];
          this.file3=this.selectedFile3;
        }
      });
  }

  fetchImageAndConvertToFile4(imageUrl: string) {
    fetch(imageUrl)
      .then(res => res.blob())
      .then(blob => {
        const urlParts = imageUrl.split('/');
        const filename4=urlParts[urlParts.length - 1];
        this.file4img = filename4;
        const file = new File([blob], filename4, { type: 'image/jpeg' });
        this.files.push(file);

        // Memisahkan file ke variabel terpisah
        if (this.files.length === 1) {
          this.selectedFile4 = this.files[0];
          this.file4=this.selectedFile4;
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
      case 2:
        this.preview2 = '';
        const cfile2 = event.target.files;
        const selectedFil2 = event.target.files;
        this.selectedFile2 = event.target.files[0] as File;
        if (selectedFil2) {
          const fil: File | null = selectedFil2.item(0);
          if (fil) {
            this.preview2 = '';
            this.file2image = fil;
            this.file2img = this.file2image.name;
            const reader = new FileReader();

            reader.onload = (e: any) => {
              console.log(e.target.result);
              this.preview2 = e.target.result;
            };

            reader.readAsDataURL(this.file2image);
          }
        }
        break;
      case 3:
        this.preview3 = '';
        const cfile3 = event.target.files;
        const selectedFil3 = event.target.files;
        this.selectedFile3 = event.target.files[0] as File;
        if (selectedFil3) {
          const fil: File | null = selectedFil3.item(0);
          if (fil) {
            this.preview3 = '';
            this.file3image = fil;
            this.file3img = this.file3image.name;
            const reader = new FileReader();
            reader.onload = (e: any) => {
              console.log(e.target.result);
              this.preview3 = e.target.result;
            };
            reader.readAsDataURL(this.file3image);
          }
        }
        break;
      case 4:
        this.preview4 = '';
        const cfile4 = event.target.files;
        const selectedFil4 = event.target.files;
        this.selectedFile4 = event.target.files[0] as File;
        if (selectedFil4) {
          const fil: File | null = selectedFil4.item(0);
          if (fil) {
            this.preview4 = '';
            this.file4image = fil;
            this.file4img = this.file4image.name;
            const reader = new FileReader();

            reader.onload = (e: any) => {
              console.log(e.target.result);
              this.preview4 = e.target.result;
            };

            reader.readAsDataURL(this.file4image);
          }
        }
        break;
    }
  }


  submitRequest() {
    this.inputBestPrice();
    this.inputBestProd();
    this.inputNewProd();
    this.inputSale();

    this.data.ctecdProductCode = this.selectedprod;
    this.data.ctecdProducttypeCode = this.selectedprodtype;
    if (this.p_type == 'New') {
      alert('new');
      this.reqServ.createReqWeb(this.userid, this.data, this.selectedFile1, this.selectedFile2, this.selectedFile3, this.selectedFile4)
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
      alert('update');
      
      this.reqServ.UpdateReqWeb(this.data.ctecdId, this.userid, this.data.ctecdCtechId, this.data, this.selectedFile1, this.selectedFile2, this.selectedFile3, this.selectedFile4)
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
  }

  inputBestPrice() {
    if (this.vactive) {
      this.data.ctecdBestPrice = 'Y'
    }
    else {
      this.data.ctecdBestPrice = 'N'
    }
  }
  
  inputBestProd() {
    if (this.vacbestprod) {
      this.data.ctecdBestProduct = 'Y'
    }
    else {
      this.data.ctecdBestProduct = 'N'
    }
  }

  inputNewProd() {
    if (this.vacnewprod) {
      this.data.ctecdNewProduct = 'Y'
    }
    else {
      this.data.ctecdNewProduct = 'N'
    }
  }

  inputSale() {
    if (this.vactsale) {
      this.data.ctecdSale = 'Y'
    }
    else {
      this.data.ctecdSale = 'N'
    }
  }

  setcheck(completed: boolean) {
    if (completed) {
      this.vactive = true;
    }
    else {
      this.vactive = false;
    }
  }

  setcheckBestProd(completed: boolean) {
    if (completed) {
      this.vacbestprod = true;
    }
    else {
      this.vacbestprod = false;
    }
  }

  setcheckNewProd(completed: boolean) {
    if (completed) {
      this.vacnewprod = true;
    }
    else {
      this.vacnewprod = false;
    }
  }

  setcheckSale(completed: boolean) {
    if (completed) {
      this.vactsale = true;
    }
    else {
      this.vactsale = false;
    }
  }

  ApproveProductDtl() {
    this.pin_reqno = this.p_reqno;
    this.pin_no = this.p_no;
    alert('Approve: '+this.pin_reqno+'/'+this.pin_no);
    //this.reqServ.UpdStsProductDtl(this.data.ctecdCtechId,this.data.ctecdId);
    this.reqServ.UpdStsProductDtl(this.pin_reqno,this.pin_no)
        .subscribe(
          response => {
            console.log('Approve berhasil');
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

  /*delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }*/

   /*decrypt(ciphertext: string): string {
          const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey);
          return bytes.toString(CryptoJS.enc.Utf8);
      }*/
  
  

}
