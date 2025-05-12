import { CommonModule } from '@angular/common';
//import { AvatarModule } from 'primeng/avatar';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { LoginCompComponent } from '../login/Components/login-comp/login-comp.component';
import { ServLoginService } from '../login/Services/serv-login.service';
import { EmployeeCuComponent } from '../Employee/Forms/employee-cu/employee-cu.component';
import * as CryptoJS from 'crypto-js';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [ CommonModule, MatDialogModule,  RouterModule,MatMenuModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit{
  myacc:string="My Account";
  mypp:string="assets/user.png";
  vusrd:any ="";
  userid:any;
  errorMessage: string="gg";
 _router = inject(Router);
 vusrnm:any="";
 vusrurl:any="";
 vusnm:any="";
 vusurl:any="";
 vtkn:any;
 vtknd:any;
 vusr:any;
 private subscription!: Subscription;


 constructor(private dialog: MatDialog, private logserv:ServLoginService) {
 
  }

 ngOnInit() {

   this.subscription = this.logserv.callMethodObservable.subscribe(() => {
    this.log_info();
   });

    try {    
      this.vusrd=sessionStorage.getItem('usnm');
      this.userid=this.logserv.decrypt(this.vusrd);
     this.myacc=this.userid;
      //this.myacc = this.vusrd; 
      //alert('mmmmnavvvvv'+this.myacc);
    } catch (error) {
      const err = error as Error; // Type assertion
      console.error('Error message:', err.message);
      this.myacc="My Account";
    }

    if (this.myacc!=="My Account"){  
      this.logserv.currentVariable$.subscribe(value => {      
          this.myacc = value;
          
      });

     /* this.logserv.currentVariable3$.subscribe(value => {       
        this.mypp = value;
        
      }); */
    }else{
      alert('elsenavvv: ' +this.myacc);
      this.myacc="My Account";
     
    }

    this.vusrnm=sessionStorage.getItem('usnm');
    this.vusrd=sessionStorage.getItem('uscd');
   
    this.vusnm=this.logserv.decrypt(this.vusrnm);   
    this.vusr=this.logserv.decrypt(this.vusrd);

    this.logserv.updatemyacc(this.vusnm);
   // this.logserv.updatemyppc(this.vusurl) 

  }

  log_info(){
   // alert("aaaaaaaanavvvlogg : log_info");
      this.vusrnm=sessionStorage.getItem('usnm');
    //this.vusrurl=sessionStorage.getItem('usrimg');
    this.vusrd=sessionStorage.getItem('uscd');
   
    this.vusnm=this.logserv.decrypt(this.vusrnm);
    //this.vusurl=this.logserv.decrypt(this.vusrurl);    
    this.vusr=this.logserv.decrypt(this.vusrd);

    this.logserv.updatemyacc(this.vusnm);
    //this.logserv.updatemyppc(this.vusurl);
    this.myacc=this.vusnm;
    //this.mypp=this.vusurl;
   // alert('loginfo: '+this.myacc);
  }

  login(event: Event) {
    event.preventDefault();
    const dialogRef =this.dialog.open(LoginCompComponent,{
      height:'73.7%',
      maxWidth: '500px',
      width:'80%',
      panelClass: 'custom-dialog-container'},);
      dialogRef.afterClosed().subscribe({
        next:(val) =>{
          if (val) {
           // this.getListFaktur();
            //sessionStorage.setItem("dsono", this.dtparam);
            this.vusrnm=sessionStorage.getItem('usnm');
            this.vusrurl=sessionStorage.getItem('usrimg');
            this.vusrd=sessionStorage.getItem('uscd');
           
              this.vusnm=this.logserv.decrypt(this.vusrnm);
              this.vusurl=this.logserv.decrypt(this.vusrurl);    
              this.vusr=this.logserv.decrypt(this.vusrd);
        //alert("aaaaaaaabbbbbbbbbb: "+this.vusnm+"-----------"+this.vusurl)
            this.logserv.updatemyacc(this.vusnm);
           // this.logserv.updatemyppc(this.vusurl)   
  
          }
        }
      });      
  }
  

  registration(event: Event,ptranstype:string, vprodcode:any) {
    event.preventDefault();
    const dialogRef =this.dialog.open(EmployeeCuComponent,{
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
       
       dialogRef.componentInstance.p_type=ptranstype;
       dialogRef.componentInstance.p_no=vprodcode;
   }

   openProductInNewTab() {
    window.open('/ProductList', '_blank');
  }

  openEmployeeInNewTab() {
    window.open('/EmployeeList', '_blank');
  }

  openBannersInNewTab() {
    window.open('/BannersList', '_blank');
  }
 
}
