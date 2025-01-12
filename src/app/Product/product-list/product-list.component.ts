import { CommonModule, DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { CoreMstProduct } from 'src/app/Registration/Models/CoreMstProduct';
import { ServProductService } from 'src/app/Registration/Services/serv-product.service';
import { MatTableDataSource, MatTableModule } from "@angular/material/table"; // tambah manual
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ProductCuComponent } from '../product-cu/product-cu.component';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatDatepickerInputEvent, MatDatepickerModule } from "@angular/material/datepicker";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterLinkActive,MatInputModule,MatButtonModule,MatCardModule,
    MatFormFieldModule,MatNativeDateModule,MatPaginatorModule,MatTableModule,MatToolbarModule,
    MatIconModule, FormsModule, ReactiveFormsModule,MatDialogModule,MatDatepickerModule,
    MatSortModule,RouterOutlet, RouterModule],  
 providers: [DatePipe],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  vmsjur:CoreMstProduct[]=[]; 
  dtparam:any='a' as const;
  dt :string='';
  dtreal :string='';
  //codebarang : string = 'aaa';
  today1 = new FormControl(new Date());
  isLoading:boolean=false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['nourut','cmprCode','cmprName','cmprImgFilename','cmprImgFilepath','action'];
  vct :number=0;
  events: string[] = [];
  month:string="a";
  //brName2: string = 'bbb' || undefined;

  constructor(private _mbtserv:ServProductService,  private _router: Router, private dialog:MatDialog,
             private datePipe: DatePipe,
  ){  

  }

  ngOnInit(): void {

    alert('product list')
   
    alert('atas22');
    this.getproductListAll();
    alert('bawah22');

    /*this.isLoading=true;
    this.dtparam=sessionStorage.getItem("paramdt");
   //   alert('today'+ this.dtparam);
      if (this.dtparam.length===0) { this.dtparam;}
      this.getproductListAll;
     // this.vlength=this.vfaklist.length;  
      this.isLoading=false*/
    
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events=[];
  this.events.push(`${type}: ${event.value}`);
  this.dt=JSON.stringify(this.events);
  this.dtreal=JSON.stringify(this.dt);
  this.dtparam=this.dtreal.substring(16,27);
   sessionStorage.setItem("paramdt", this.dtparam);  
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   /*async getMasterBatchListDay(){
    this.vmsjur=[];
    this.vct=0;
    alert(this.dtparam);
    this._mbtserv.getProdListAll().subscribe((res:CoreMstProduct[])=>{
      this.vmsjur=res;
      this.dataSource=new MatTableDataSource(this.vmsjur);
      this.dataSource.data.forEach( async item => {
        this.vct=this.vct+1;
        item.nourut=this.vct;
       alert('prodnameget'+item.mbtBrCode+'/'+this.brName2)
       await this.getProdName(item.mbtBrCode);
       // alert('prodnameget22'+this.brName2)
        item.Namabarang = this.brName2 + ' ('+ item.mbtBrCode +')';
        
      });      
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
     
      error:(error: HttpErrorResponse):void =>{
        if (error instanceof ErrorEvent){
                }else{
          server side error
        }
       }
    })  
    }*/


    //coba list awal all - tidak tampil saat awal masuk list, jika di panggil by button baru jalan
   getproductListAll(){
    alert('mnmnmnmnm');
      this.vmsjur=[];
      this.vct=0;
      alert('productlist');
      this._mbtserv.getProdListAll().subscribe((res:CoreMstProduct[])=>{
        alert(res.length)
        this.vmsjur=res;
        this.dataSource=new MatTableDataSource(this.vmsjur);
        this.dataSource.data.forEach( async item => {
          this.vct=this.vct+1;
          item.nourut=this.vct;
        });
        
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
       
        error:(error: HttpErrorResponse):void =>{
          if (error instanceof ErrorEvent){
                  }else{
            //server side error
          }
         }
      })  
    }

  viewAddProduct(ptranstype:string, vprodcode:any){
    const dialogRef =this.dialog.open(ProductCuComponent,{height:'90%',width:'80%'},);
      dialogRef.afterClosed().subscribe({
        next:(val) =>{
          if (val) {
            //this.getListFaktur();
            //sessionStorage.setItem("dsono", this.dtparam);  
  
          }
        }
      });
      
      /*dialogRef.componentInstance.nobatch=vprodcode;
      dialogRef.componentInstance.type=ptranstype;*/

    }

}
