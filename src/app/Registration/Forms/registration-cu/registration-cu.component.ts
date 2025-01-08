import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { ServRegistrationService } from '../../Services/serv-registration.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VCustRegistration } from '../../Models/VCustRegistration';


@Component({
  selector: 'app-registration-cu',
  standalone: true,
  imports: [CommonModule,  MatTabsModule, MatIconModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule, 
    MatCheckboxModule, MatInputModule, FormsModule],
  templateUrl: './registration-cu.component.html',
  styleUrls: ['./registration-cu.component.css']
})
export class RegistrationCUComponent implements OnInit {
  RegisForm: FormGroup;
  vregislist: VCustRegistration[]=[];
  base64String: string = 'your_base64_image_string_here'; 
  imageNikUrl: SafeUrl | null = null;
  imageNibUrl: SafeUrl | null = null;

  constructor(private regiServ : ServRegistrationService, private formBuider: FormBuilder, private http: HttpClient,
              private sanitizer: DomSanitizer ){
    this.RegisForm = this.formBuider.group({
      ccregId: '',
      ccregAddress: '',
      ccregArea: '',
      ccregCityId: '',
      ccregEmail: '',
      ccregKecId: '',
      ccregKelId: '',
      ccregLongLat: '',
      ccregMinApproval: '',
      ccregMobilePhone: '',
      ccregName: '',
      ccregNationId: '',
      ccregNationImgFileName: '',
      ccregNikImage: '',
      ccregNibId: '',
      ccregNibImgFileName: '',
      ccregNibImage: '',
      ccregNickName: '',
      ccregPhone: '',
      ccregPic1Email: '',
      ccregPic1Name: '',
      ccregPic1Phone: '',
      ccregPic1password: '',
      ccregPic2Email: '',
      ccregPic2Name: '',
      ccregPic2Phone: '',
      ccregPic2password: '',
      ccregPic3Email: '',
      ccregPic3Name: '',
      ccregPic3Phone: '',
      ccregPic3password: '',
      ccregProvId: '',
      ccregRecvCmbaName: '',
      ccregRevcCmbaAccount: '',
      ccregRevcCmbaId: '',
      ccregRt: '' ,
      ccregRw: '',
      ccregSentCmbaAccount: '',
      ccregSentCmbaId: '',
      ccregSentCmbaName: '',
      ccregZip: ''
    });
  }

  ngOnInit(): void {
    this.getVRegis();
   
   
  }

  getVRegis() {
    this.vregislist = [];
    alert("aaaaa");
    this.regiServ.getCustRegisById().subscribe((res: VCustRegistration[]) => {
      this.vregislist = res;
      alert("rhl00003");
      for (var i = 0; i < this.vregislist.length; i++) {
        this.base64String=this.vregislist[i].ccregNikImage;
        this.imageNikUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.base64String);
        this.imageNibUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.vregislist[i].ccregNibImage);
        this.RegisForm.setValue({
          ccregId:  this.vregislist[i].ccregId ,
          ccregName: this.vregislist[i].ccregName,
          ccregNickName: this.vregislist[i].ccregNickName,
          ccregNationId: this.vregislist[i].ccregNationId,
          ccregNationImgFileName: this.vregislist[i].ccregNationImgFileName,
          ccregNikImage: this.vregislist[i].ccregNikImage,
          ccregNibId: this.vregislist[i].ccregNibId,
          ccregNibImgFileName: this.vregislist[i].ccregNibImgFileName,
          ccregNibImage: this.vregislist[i].ccregNibImage,
          ccregAddress: this.vregislist[i].ccregAddress,
          ccregRt: '' ,
          ccregRw: '',
          ccregProvId: '',
          ccregCityId: '',
          ccregKecId: '',
          ccregKelId: '',
          ccregArea: '',
          ccregZip: '',
          ccregMobilePhone: '',
          ccregPhone: '',
          ccregEmail: '',
          ccregLongLat: '',
          ccregSentCmbaId: '',
          ccregSentCmbaName: '',
          ccregSentCmbaAccount: '',
          ccregRevcCmbaId: '',
          ccregRecvCmbaName: '',
          ccregRevcCmbaAccount: '',
          ccregMinApproval: '',
          ccregPic1Name: '',
          ccregPic1Phone: '',
          ccregPic1Email: '',
          ccregPic1password: '',
          ccregPic2Name: '',
          ccregPic2Phone: '',
          ccregPic2Email: '',
          ccregPic2password: '',
          ccregPic3Name: '',
          ccregPic3Phone: '',
          ccregPic3Email: '',
          ccregPic3password: ''
        });
      }
      
      //const jsonString2 = JSON.stringify(this.vregislist);
     // const formConfig2 = JSON.parse(jsonString2);
      //console.log(formConfig);
     // this.RegisForm = this.formBuider.group(formConfig2);
    //  alert(this.RegisForm.get('ccregName')?.value);
    //  setTimeout(() => {
    //    alert("aaaa : " + this.RegisForm.get('ccregNibImage')?.value); 
    //  }, 10000);
     
    
    });
  }
}
