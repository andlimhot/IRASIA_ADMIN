import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationCUComponent } from './Registration/Forms/registration-cu/registration-cu.component';
import { HttpClientModule } from '@angular/common/http';
import { ProducttypeCuComponent } from './ProductType/producttype-cu/producttype-cu.component';
import { FImageComponent } from './Sample/Form/fimage/fimage.component';
import { ProductListComponent } from './Product/product-list/product-list.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { ProductCuComponent } from './Product/product-cu/product-cu.component';
import { ProducttypeListComponent } from './ProductType/producttype-list/producttype-list.component';
import { RegistrationListComponent } from './Registration/Forms/registration-list/registration-list.component';
import { ReqUpdateListComponent } from './RequestEC/Forms/req-update-list/req-update-list.component';
import { RequestUploadListComponent } from './RequestEC/Forms/request-upload-list/request-upload-list.component';
import { ListRequestComponent } from './RequestEC/Forms/list-request/list-request.component';
import { FormUserLoginComponent } from './MainScreen/form-user-login/form-user-login.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { EmployeeListComponent } from './Employee/Forms/employee-list/employee-list.component';
import { ReqUpdateListCommentComponent } from './RequestEC/Forms/req-update-list-comment/req-update-list-comment.component';
import { BannersListComponent } from './Banners/Forms/banners-list/banners-list.component';
import { BannersCuComponent } from './Banners/Forms/banners-cu/banners-cu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
//import { AvatarModule } from 'primeng/avatar';

const ROUTES: Routes = [ 
  { path: 'ProductList', component: ProductListComponent },
  { path: 'ProducttypeList', component: ProducttypeListComponent },
  { path: 'RegistrationList', component: RegistrationListComponent},
  { path: 'RequestList', component: ListRequestComponent },
  { path: 'RequestUpdList/:param1/:param2/:param3', component: ReqUpdateListComponent },
  { path: 'RequestCU/:param1/:param2/:param3', component: RequestUploadListComponent },
  { path: 'login', component: FormUserLoginComponent },
  { path: 'EmployeeList', component: EmployeeListComponent },
  { path: 'BannersList', component: BannersListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FImageComponent,
    ProductListComponent,
    ProducttypeListComponent,
    RegistrationListComponent,
    RegistrationCUComponent,
    ListRequestComponent,
    RouterModule.forRoot(ROUTES),
    RouterOutlet,
    HeaderNavComponent,
    EmployeeListComponent,
    BannersListComponent,
    MatCardModule,
    MatToolbarModule,
],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
