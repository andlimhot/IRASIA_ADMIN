import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { employeemdl } from '../../Models/employeemdl';
import { ServEmployeeService } from '../../Services/serv-employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeCuComponent } from '../employee-cu/employee-cu.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterLinkActive,MatInputModule,MatButtonModule,MatCardModule,
    MatFormFieldModule,MatNativeDateModule,MatPaginatorModule,MatTableModule,MatToolbarModule,
    MatIconModule, FormsModule, ReactiveFormsModule,MatDialogModule,MatDatepickerModule,
    MatSortModule,RouterOutlet, RouterModule],  
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit{

  vmsjur:employeemdl[]=[]; 
    dtparam:any='a' as const;
    dt :string='';
    dtreal :string='';
    //codebarang : string = 'aaa';
    today1 = new FormControl(new Date());
    isLoading:boolean=false;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    dataSource!: MatTableDataSource<any>;
    displayedColumns: string[] = ['nourut','cmeEmplNik','cmeEmplName','cmeDescription','cmeEmplHandphone','cmeEmplEmail','cmeActiveDate','cmeResignDate','cmeJobLevel','cmeUpLevel','action'];
    vct :number=0;
    events: string[] = [];
    month:string="a";
  
    constructor(private _mbtserv:ServEmployeeService,  private _router: Router, private dialog:MatDialog,
    ){  
  
    }
  
    ngOnInit(): void {
  
      this.getEmplListAll();
      
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
  
  
     getEmplListAll(){
        this.vmsjur=[];
        this.vct=0;
        //alert('productlist');
        this._mbtserv.getEmplListAll().subscribe((res:employeemdl[])=>{
          alert('lenghtempl: '+ res.length)
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
      const dialogRef =this.dialog.open(EmployeeCuComponent,{height:'90%',width:'80%'},);
        dialogRef.afterClosed().subscribe({
          next:(val) =>{
            if (val) {
              this.getEmplListAll();
              //sessionStorage.setItem("dsono", this.dtparam);  
    
            }
          }
        });
        
        dialogRef.componentInstance.p_type=ptranstype;
        dialogRef.componentInstance.p_no=vprodcode;
  
      }

}
