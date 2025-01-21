import { CommonModule } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CoreMstProduct } from 'src/app/Registration/Models/CoreMstProduct';
import { map, Observable, startWith } from 'rxjs';
import { ServProductService } from 'src/app/Registration/Services/serv-product.service';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { ProducttypeListComponent } from 'src/app/ProductType/producttype-list/producttype-list.component';

@Component({
  selector: 'app-product-cu',
  standalone: true,
  imports: [MatCardModule, MatToolbarModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, ReactiveFormsModule, MatButtonModule, CommonModule, MatSelectModule, MatTableModule,
    FormsModule, MatDatepickerModule, MatCheckboxModule, MatSortModule, MatPaginatorModule,
    MatNativeDateModule, MatIconModule, MatAutocompleteModule, MatTabsModule,ProducttypeListComponent,
    ],
  templateUrl: './product-cu.component.html',
  styleUrls: ['./product-cu.component.css']
})


export class ProductCuComponent {

  vbatchsingle: CoreMstProduct[] = [];
  MasterProdForm: FormGroup;
  Prodno: any;
  type: string = 'a';
  p_tglbatch:any='a';
  selectedValue: string = 'a';
  selectedValue2: string = 'a';
  selectedValue3: string = 'a';
  dt: string = '';
  today1 = new FormControl(new Date());
  events: string[] = [];
  vactive = false;
  options2: string[] = [];
  //filteredOptions2: Observable<string[]>;

  filepathnamenik:string='';
  selectedFilenik: File | null = null;
  dirname: string = '';
  uploadProgress: number | null = null;
  uploadMessage: string | null = null;
  vregid:number=0;
  message='';
  preview='';
  nikimage?:File;
  nikimg:string="a";
  
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _servBacthSingle: ServProductService,
    @Inject(MAT_DIALOG_DATA) private data: string,
    private dialogRef: MatDialogRef<ProductCuComponent>,
    private dialog: MatDialog,
    private http: HttpClient,
    private formBuider: FormBuilder,
  ) {
    this.MasterProdForm = this.formBuider.group({
    cmprCode: '',
    cmprName: '',
    cmprImgFilename: '',
    cmprImgFilepath: '',
    cmprCreateBy: '',
    cmprCreateDate: '',
    cmprUpdateBy: '',
    cmprUpdateDate: '',

    })

  }

  closeForm() {
    this.dialogRef.close(true)
  }

  ngOnInit(): void {
    alert('oninit'+ '/'+ this.type +'/' + this.Prodno);


    if (this.type === "Insert") {

    }

    if (this.type === "Update") {
      alert('Update');
      this.getProdCodeSingle();
      //alert('vbrnameinit: '+ this.vbrangdes)

    }

  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events = [];
    this.events.push(`${type}: ${event.value}`);
    this.dt = JSON.stringify(this.events);
    /* this.dtreal=JSON.stringify(this.dt);
     this.dtparam=this.dtreal.substring(16,27);
      sessionStorage.setItem("paramdt", this.dtparam);  */
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeDept(value: any) {
    // console.log(value);
    this.selectedValue = value;
  }


  async getProdCodeSingle() {
    alert('sssss'+ this.Prodno),
    this.vbatchsingle = [];
    this._servBacthSingle.getProdSingle(this.Prodno).subscribe((res: CoreMstProduct[]) => {
      this.vbatchsingle = res;
      //ambil data langsung dari json nya
      const jsonString2 = JSON.stringify(this.vbatchsingle);
      const formConfig2 = JSON.parse(jsonString2);
      //console.log(formConfig);
      this.MasterProdForm = this.formBuider.group(formConfig2);
    });

  }

  private _filter2(value2: string): string[] {
    const filterValue2 = value2.toLowerCase();
    return this.options2.filter(option2 => option2.toLowerCase().includes(filterValue2));
  }

  //untuk upload

  selectImageNik(event : any){
    this.message='';
    this.preview='';
    const selectedNik = event.target.files;
    this.selectedFilenik = event.target.files[0] as File;
    if (selectedNik){
      const nik:File | null =selectedNik.item(0);
      if (nik){
        this.preview='';
        this.nikimage=nik;
        this.nikimg=this.nikimage.name;
        const reader = new FileReader();
  
        reader.onload=(e:any) => {
          console.log(e.target.result);
          this.preview=e.target.result;
        };
  
        reader.readAsDataURL(this.nikimage);
      }
    }
  }


  onUpload(): void {
    if (!this.selectedFilenik) {
      this.uploadMessage = 'Please select a file and enter a directory name.';
      return;
    }
  
  
    this.uploadProgress = 0;
    this.uploadMessage = null;
  
    const formData = new FormData();
    formData.append('file', this.selectedFilenik);
    formData.append('dirname', this.vregid.toString());
  
    this.http.post('http://localhost:8091/wc-svc/file/RegisUpload', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(100 * event.loaded / event.total!);
      } else if (event instanceof HttpResponse) {
        this.uploadMessage = event.body as string;
        this.selectedFilenik = null;
        this.dirname = '';
        this.uploadProgress = null;
      }
    }, error => {
      this.uploadMessage = 'Upload failed: ' + error.message;
      this.uploadProgress = null;
    });

  }



  SaveUpdateProd() {
    //alert('call update')
    
    if (this.type === "Insert") {
      this.MasterProdForm.patchValue({
        cmprCreateBy: sessionStorage.getItem('session_userId'),
      });
    }

    if (this.type === "Update") {
      this.MasterProdForm.patchValue({
        cmprUpdateBy: sessionStorage.getItem('session_userId'),
      });
    }

    // penambahan upload
    this.filepathnamenik="D:\\iasia\\UI\\IMAGES\\REGISTRATIONS\\"+this.vregid.toString()+"\\"+this.nikimg;
  
      this.MasterProdForm.patchValue({
      //ccregId: this.vregid,
  
      cmprImgFilename:  this.nikimg,
      cmprImgFilepath:this.filepathnamenik,
    });

    //alert('call service update')
    this._servBacthSingle.saveupdateProd(this.MasterProdForm.value).subscribe({
      next: (val: any) => {
        alert(val);
        //  alert('saveeee')
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

}
