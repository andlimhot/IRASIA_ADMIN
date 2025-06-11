import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { HeaderNavComponent } from 'src/app/header-nav/header-nav.component';
import { VQuoHdrList } from '../../Models/VQuoHdrList';
import { ServQuoService } from '../../Services/serv-quo.service';
import { ServLoginService } from 'src/app/login/Services/serv-login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { QuoByproductDetailListComponent } from '../quo-byproduct-detail-list/quo-byproduct-detail-list.component';

@Component({
  selector: 'app-quo-byproduct-list',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, MatCardModule,
    MatFormFieldModule, MatNativeDateModule, MatPaginatorModule, MatTableModule,
    MatIconModule, FormsModule, ReactiveFormsModule, MatDialogModule,
    MatSortModule, RouterModule, HeaderNavComponent],
  templateUrl: './quo-byproduct-list.component.html',
  styleUrls: ['./quo-byproduct-list.component.css']
})
export class QuoByproductListComponent implements OnInit {

   displayedColumns: string[] = ['nourut', 'vquoId','vquoDate','vquoStatus','vquoSendDate','vquoUserId','vquoApprove','action'];
  vquolist:VQuoHdrList[]=[];
  vusrnm:any="";
  vusrurl:any="";
  vusnm:any="";
  vusurl:any="";
  vtkn:any;
  vtknd:any;
  vusr:any;
  vusrd:any;
  vct:number=0;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _vquoserv:ServQuoService, private _router: Router, private dialog:MatDialog,  private logserv:ServLoginService){ 
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('🔍 NavigationStart:', event.url);
      }
    });
  }

  
  ngOnInit(): void {   
   /* this.vusrnm=sessionStorage.getItem('usnm');
    this.vusrurl=sessionStorage.getItem('usrimg');
    this.vusrd=sessionStorage.getItem('uscd');
   
    this.vusnm=this.logserv.decrypt(this.vusrnm);
    this.vusurl=this.logserv.decrypt(this.vusrurl);    
    this.vusr=this.logserv.decrypt(this.vusrd);

    this.logserv.updatemyacc(this.vusnm);
    this.logserv.updatemyppc(this.vusurl) */
    
    this.getQuoManualHdrList();
  };

  getQuoManualHdrList(){
    this.vquolist=[];
    this.vct=0;
    //this._vquoserv.QuoList().subscribe((res:VQuoHdrList[])=>{
    this._vquoserv.QuoManualListBySts('P', this.vtkn).subscribe((res:VQuoHdrList[])=>{
      this.vquolist=res;
      this.dataSource=new MatTableDataSource(this.vquolist);
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
    });  
  };

  /*AddQuo(ptranstype: string){
        const dialogRef =this.dialog.open(QuoByproductListComponent,{
          height:'90%',
          maxWidth: '1100px',
            width:'99%',
            panelClass: 'custom-dialog-container'},);
              dialogRef.afterClosed().subscribe({
                next:(val) =>{
                  if (val) {
                   // this.getListFaktur();
                    //sessionStorage.setItem("dsono", this.dtparam);  
          
                  }
                }
              });      
              dialogRef.componentInstance.p_usr = this.vusr;
              dialogRef.componentInstance.p_type = 'Insert';
      }*/
 

     applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }

  updateRequest(tipe:string, reqno:string,p_user:string){       
            //this._router.navigate(['RequestUpdList', tipe,reqno]);
      const dialogRef =this.dialog.open(QuoByproductDetailListComponent,{
            height:'90%',
            maxWidth: '1100px',
            width:'99%',
            panelClass: 'custom-dialog-container'},);
            dialogRef.afterClosed().subscribe({
                next:(val) =>{
                      if (val) {
                        this.getQuoManualHdrList();              
                      }
                    }
                  });      
    dialogRef.componentInstance.p_usr=p_user;
    dialogRef.componentInstance.p_quono=reqno;
    dialogRef.componentInstance.p_type='Update';
  }

}
