import { CommonModule, DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { CoreMstProduct } from 'src/app/Registration/Models/CoreMstProduct';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterLinkActive,MatInputModule,
    MatFormFieldModule,MatNativeDateModule,
    MatIconModule, FormsModule, ReactiveFormsModule, RouterOutlet,  RouterModule],  
 providers: [DatePipe],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  vmsjur:CoreMstProduct[]=[]; 
  dtparam:any='a' as const;
  dt :string='';
  dtreal :string='';
  codebarang : string = 'aaa';
  today1 = new FormControl(new Date());
  isLoading:boolean=false;
  /*@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;*/
  displayedColumns: string[] = ['nourut', 'mbtBrCode','Namabarang','mbtNoBatch','mbtTglBatch','mbtTglSelesai','action'];
  vct :number=0;
 // vcredit:number=0;
 // vdebet:number=0;
  events: string[] = [];
  month:string="a";
  //brName2: string = 'bbb' || undefined;

 
}
