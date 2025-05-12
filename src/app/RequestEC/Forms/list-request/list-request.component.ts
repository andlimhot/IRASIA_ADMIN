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
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { vrequestlist } from '../../Models/vrequestlist';
import { RequestServService } from '../../Services/request-serv.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestUploadListComponent } from '../request-upload-list/request-upload-list.component';
import { vrequestlistadm } from '../../Models/vrequestlistadm';

@Component({
  selector: 'app-list-request',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive,MatInputModule,MatButtonModule,MatCardModule,
    MatFormFieldModule,MatNativeDateModule,MatPaginatorModule,MatTableModule,
    MatIconModule, FormsModule, ReactiveFormsModule,MatDialogModule, 
    MatSortModule,  RouterModule, RouterModule, RouterLink],
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.css']
})
export class ListRequestComponent implements OnInit{
  displayedColumns: string[] = ['nourut', 'vrlaReqno','vrlaCustno','vrlaDate','vrlaStatus','vrlaDateSort','vrlaSummary','action'];
  vrllist:vrequestlistadm[]=[];
  vct:number=0;
  //usr:string="0001";
  secretKey: string="12!@#$%abgz123";
  vtkn:any;
  vtknd:any;
  vusr:any;
  vusrd:any;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _vrlserv:RequestServService,  private _router: Router, private dialog:MatDialog){    
  }

  ngOnInit(): void {
    this.vusrd=sessionStorage.getItem('usr');
    this.vtknd=sessionStorage.getItem('tkn');
    //this.vusr=this.decrypt(this.vusrd);
    //this.vtkn=this.decrypt(this.vtknd);
    alert("aaaaa :"+this.vusr+" ---- "+this.vtkn);
    this.getVrlByUser();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getVrlByUser(){
    this.vrllist=[];
    this.vct=0;
    
   
    this._vrlserv.getVReqByuser(this.vtkn).subscribe((res:vrequestlistadm[])=>{
      this.vrllist=res;
      this.dataSource=new MatTableDataSource(this.vrllist);
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
    }

    /*AddRequest(ptranstype:string){
      const dialogRef =this.dialog.open(RequestUploadListComponent,{height:'90%',width:'80%'},);
        dialogRef.afterClosed().subscribe({
          next:(val) =>{
            if (val) {
              //this.getListFaktur();
              //sessionStorage.setItem("dsono", this.dtparam);  
    
            }
          }
        });        
        dialogRef.componentInstance.p_usr=this.usr;
        dialogRef.componentInstance.p_type='ptranstype';
    }*/

    updateRequest(tipe:string, reqno:string, user:string){       
        this._router.navigate(['RequestUpdList', tipe,reqno,user]);
    }

   /* decrypt(ciphertext: string): string {
        const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }*/

}
