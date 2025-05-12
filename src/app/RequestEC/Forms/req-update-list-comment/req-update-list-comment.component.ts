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
import { RequestServService } from '../../Services/request-serv.service';
import { RequestDtl } from '../../Models/RequestDtl';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-req-update-list-comment',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatIconModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule,
    MatCheckboxModule, MatInputModule, FormsModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './req-update-list-comment.component.html',
  styleUrls: ['./req-update-list-comment.component.css']
})
export class ReqUpdateListCommentComponent implements OnInit{

  p_usr: string = "aaaaa";
  p_reqno: string = "aaaaa";
  p_type: string = "aaaaa";
  p_no: string = "aaaaa";
  p_notes: string = "aaaaa";

  rdtl: RequestDtl[] = [];
    dataSource!: MatTableDataSource<any>;
  
    userid: string = 'USER09';
    data: RequestDtl = {
      ctecdCtechId: "",
      ctecdId: "",
      ctecdProductCode: 0,
      ctecdProductName: "",
      ctecdProducttypeCode: 0,
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

  constructor(private reqServ: RequestServService, private formBuider: FormBuilder,
      private route: ActivatedRoute) {
  
    }

    ngOnInit(): void {

    }

    ApproveProductDtl() {
      alert('reject: '+ this.p_reqno+'/'+this.p_no+'/'+this.data.ctecdReason+'/'+this.p_usr)
      this.reqServ.UpdStsProductDtl(this.p_reqno,this.p_no,this.data.ctecdReason,this.p_usr)
          .subscribe(
            response => {
              console.log('Reject berhasil');
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

}
