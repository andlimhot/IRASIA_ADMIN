import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RequestDtl } from '../../Models/RequestDtl';
import { requestlistupd } from '../../Models/requestlistupd';
import { RequestServService } from '../../Services/request-serv.service';
import { RequestUploadListComponent } from '../request-upload-list/request-upload-list.component';
import { CoreMstProduct } from 'src/app/Registration/Models/CoreMstProduct';
import { CoreMstProductType } from 'src/app/Registration/Models/CoreMstProductType';
import { ProductProducttypeServService } from '../../Services/product-producttype-serv.service';
import { DTORequestList } from '../../Models/DTORequestList';

@Component({
  selector: 'app-req-update-list',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatIconModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule,
    MatCheckboxModule, MatInputModule, FormsModule, RouterLink, RouterLinkActive, RouterOutlet, MatDialogModule],
  templateUrl: './req-update-list.component.html',
  styleUrls: ['./req-update-list.component.css']
})
export class ReqUpdateListComponent implements OnInit{

  p_usr: string = "aaaaa";
  p_reqno: string = "aaaaa";
  p_type: string = "aaaaa";
  
  file1img: string = "a"; 
  file2img: string = "a";  
  file3img: string = "a";  
  file4img: string = "a";

  secretKey: string="12!@#$%abgz123";
  vtkn:any;
  vtknd:any;
  vusr:any;
  vusrd:any;
 

  prodlist: CoreMstProduct[] = [];
  prodtylist: CoreMstProductType[] = [];
  rdtl: RequestDtl[] = [];
  userid: string = 'USER09';
  imageUrls: string[] = [];  
  productName: string = "ccc"; 
  producttype: string = "aaaa";
  data: requestlistupd[] = [];
  requestList: DTORequestList[]=[];

  constructor(private reqServ: RequestServService, private formBuider: FormBuilder, private dialog:MatDialog,
    private route: ActivatedRoute, private masterserv: ProductProducttypeServService) {

  }

  ngOnInit(): void {
    this.vusrd=sessionStorage.getItem('usr');
    this.vtknd=sessionStorage.getItem('tkn');
    //this.vusr=this.decrypt(this.vusrd);
    //this.vtkn=this.decrypt(this.vtknd);
    console.log("URL:", this.route.url);
    this.route.params.subscribe(params => {
      this.p_type = params['param1'];
      this.p_reqno = params['param2'];
    });
  //  this.getRequestDtl(this.p_reqno);
      this.getRequestList(this.p_reqno);
  }

  getRequestList(req: string){
    this.requestList=[];
    this.reqServ.getReqList(req, "USER09", this.vusr, this.vtkn).subscribe((res: DTORequestList[]) => {
      this.requestList = res;
    });

  }

  async getRequestDtl(req: string) {
    this.rdtl = [];
    this.data = [];
    this.reqServ.getReqEcById(req, this.vusr, this.vtkn).subscribe(async (res: RequestDtl[]) => {
      this.rdtl = res;
     
      for (var j = 0; j < this.rdtl.length; j++) {
        await this.delay(50); 
        this.file1img='';
        this.file2img='';
        this.file3img='';
        this.file4img='';// Tunggu 1/2 detik
        // alert("dddddd: "+ this.rdtl[j].ctecdCtechId);
        this.reqServ.getImages(this.userid, this.rdtl[j].ctecdCtechId, this.rdtl[j].ctecdId.toString(), this.vusr, this.vtkn ).subscribe(
          (data: string[]) => {
            this.imageUrls = data;
             //  alert("eeeekkkkk1111: "+ this.imageUrls.length );
            for (var k = 0; k < this.imageUrls.length; k++) {

              if (k == 0) {  // <-- Diperbaiki
                this.file1img = this.imageUrls[k];

              }
              if (k == 1) {
                this.file2img = this.imageUrls[k];
              }
              if (k == 2) {
                this.file3img = this.imageUrls[k];
              }
              if (k == 3) {
                this.file4img = this.imageUrls[k];
              }
            }
          },
          (error) => {
            console.error('Error fetching images:', error);
          }
        );

        await this.delay(50); // Tunggu 1/2 detik


        this.data.push({
          prodno: this.rdtl[j].ctecdId,
          prodname: this.rdtl[j].ctecdProductName,
          prodtypename: this.rdtl[j].ctecdProducttypeName,
          prodprice: this.rdtl[j].ctecdProducttypePrice.toString(),
          proddesc: this.rdtl[j].ctecdProducttypeDesc,
          prodAlias: this.rdtl[j].ctecdProductTypeAlias,
          prodsize: this.rdtl[j].ctecdProductTypeSize,
          prodStock: this.rdtl[j].ctecdProducttypeStockQty.toString(),
          prodMinpurc: this.rdtl[j].ctecdProducttypeMinQty.toString(),
          previmg: this.file1img, 
          previmg2: this.file2img, 
          previmg3: this.file3img, 
          previmg4: this.file4img, 
        });
      }
    });
  }

  getProductList(code: String) {
  
    this.masterserv.getProductByCode(code).subscribe((res: CoreMstProduct[]) => {
      this.prodlist = res;
      this.productName = this.prodlist[0].cmprName;

    });
  }

  getProducttypeList(value: any) {
    this.masterserv.getProductTypeByCode(value).subscribe((res: CoreMstProductType[]) => {
      this.prodtylist = res;
      this.producttype = this.prodtylist[0].cmprtTypeDesc;
    });

  }

    updateRequest(ptranstype:string, no:string){
         const dialogRef =this.dialog.open(RequestUploadListComponent,{height:'90%',width:'80%'},);
           dialogRef.afterClosed().subscribe({
             next:(val) =>{
               if (val) {
                 //this.getListFaktur();
                 //sessionStorage.setItem("dsono", this.dtparam);  
       
               }
             }
           });        
           dialogRef.componentInstance.p_usr=this.p_usr;
           dialogRef.componentInstance.p_type="Update";  
           dialogRef.componentInstance.p_no=no;
           dialogRef.componentInstance.p_reqno=this.p_reqno;
         }
  SendTOWeb(code: String) {
    alert('sendtoweb')
    /*this.masterserv.getProductByCode(code).subscribe((res: CoreMstProduct[]) => {
      this.prodlist = res;
      this.productName = this.prodlist[0].cmprName;

    });*/
  }
    
    delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    /* decrypt(ciphertext: string): string {
            const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey);
            return bytes.toString(CryptoJS.enc.Utf8);
        }*/

}
