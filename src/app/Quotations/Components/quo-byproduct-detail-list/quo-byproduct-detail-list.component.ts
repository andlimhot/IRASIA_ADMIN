import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { QuotationDetail } from '../../Models/QuotationDetail';
import { CoreMstProduct } from 'src/app/Registration/Models/CoreMstProduct';
import { CoreMstProductType } from 'src/app/Registration/Models/CoreMstProductType';
import { DtoQuoByProduct } from '../../Models/DtoQuoByProduct';
import { ServProducttypeService } from 'src/app/Registration/Services/serv-producttype.service';
import { ServQuoService } from '../../Services/serv-quo.service';
import { ActivatedRoute } from '@angular/router';
import { ServLoginService } from 'src/app/login/Services/serv-login.service';
import { ServProductService } from 'src/app/Registration/Services/serv-product.service';
import { QuoByproductCommentComponent } from '../quo-byproduct-comment/quo-byproduct-comment.component';

@Component({
  selector: 'app-quo-byproduct-detail-list',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatIconModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule,
    MatCheckboxModule, MatInputModule, FormsModule, MatDialogModule],
  templateUrl: './quo-byproduct-detail-list.component.html',
  styleUrls: ['./quo-byproduct-detail-list.component.css']
})
export class QuoByproductDetailListComponent implements OnInit {
  p_usr: string = "aaaaa";
  p_quono: string = "aaaaa";
  p_type: string = "aaaaa";

  file1img: string = "a";
  file2img: string = "a";
  file3img: string = "a";
  file4img: string = "a";

  vtkn: any;
  vtknd: any;
  vusr: any;
  vusrd: any;
  requestNumber: string = '';

  prodlist: CoreMstProduct[] = [];
  prodtylist: CoreMstProductType[] = [];
  qdtl: QuotationDetail[] = [];
  //userid: string = 'USER09';
  imageUrls: string[] = [];
  sentresult: string = "aaaa";
  productName: string = "ccc";
  producttype: string = "aaaa";
  // data: requestlistupd[] = [];
  quoList: DtoQuoByProduct[] = [];

  vusrnm: any = "";
  vusnm: any = "";
  vusradmin: any;
  vusrdadmin: any;

  modalImage: string | null = null;

  constructor(private quoServ: ServQuoService, private formBuider: FormBuilder, private dialog: MatDialog,private dialogRef: MatDialogRef<QuoByproductDetailListComponent>,
    private route: ActivatedRoute, private masterprserv: ServProductService, private masterserv: ServProducttypeService, private logserv: ServLoginService) {

  }

  ngOnInit(): void {
    this.vusrnm = sessionStorage.getItem('usnm');
    this.vusrdadmin = sessionStorage.getItem('uscd');
    this.vusnm = this.logserv.decrypt(this.vusrnm);
    this.vusradmin = this.logserv.decrypt(this.vusrdadmin);
    /*this.vtkn=this.logserv.decrypt(this.vtknd);*/
    // this.route.params.subscribe(params => {
    ///  this.p_type = params['param1'];
    //  this.p_reqno = params['param2'];
    //  });
    //  this.getRequestDtl(this.p_reqno);
    //alert('initquolist: ' + this.p_quono);
    this.getquoList(this.p_quono);
  }

  getquoList(quo: string) {
    this.quoList = [];
    this.quoServ.QuoListByQuoidUser(quo, this.p_usr, this.vtkn).subscribe((res: DtoQuoByProduct[]) => {
      this.quoList = res;
    });
  }

  getProductList(code: String) {

    this.masterprserv.getProdSingle(code).subscribe((res: CoreMstProduct[]) => {
      this.prodlist = res;
      this.productName = this.prodlist[0].cmprName;

    });
  }

  getProducttypeList(value: any) {
    this.masterserv.getProdTypeListByCode(value).subscribe((res: CoreMstProductType[]) => {
      this.prodtylist = res;
      this.producttype = this.prodtylist[0].cmprtTypeDesc;
    });

  }

  closeForm() {
    this.dialogRef.close(true)
  }

  updateQuo(ptranstype: string, no: string) {
    /* const dialogRef =this.dialog.open(QuoByProductCuComponent,{
      height:'90%',
      maxWidth: '1000px',
      width:'80%',
      panelClass: 'custom-dialog-container'},);
        dialogRef.afterClosed().subscribe({
          next:(val) =>{
            if (val) {
             // this.getListFaktur();
              //sessionStorage.setItem("dsono", this.dtparam);  
    
            }
          }
        });      
       dialogRef.componentInstance.p_usr=this.p_usr;
       dialogRef.componentInstance.p_type="Update";  
       dialogRef.componentInstance.p_no=no;
       dialogRef.componentInstance.p_quono=this.p_quono;*/
  }

  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  CallProcQuoToBlast() {
    alert('CallQuoToBlast: ' + this.p_quono + '/' + this.vusradmin);
    this.quoServ.ProcQuoToBalst(this.p_quono, this.vusradmin)
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

  RejectQuo() {
    //this._router.navigate(['RequestUpdList', tipe,reqno]);
    const dialogRef = this.dialog.open(QuoByproductCommentComponent, { height: '40%', width: '40%' },);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getquoList(this.p_quono);
        }
      }
    });
    //dialogRef.componentInstance.p_usr=p_user;
    dialogRef.componentInstance.p_quono = this.p_quono;
    dialogRef.componentInstance.p_type = 'Update';
  }

  openModal(imageSrc: string) {
    this.modalImage = imageSrc;
  }

}
