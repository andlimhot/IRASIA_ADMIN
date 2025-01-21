import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationCUComponent } from './Registration/Forms/registration-cu/registration-cu.component';
import { HttpClientModule } from '@angular/common/http';
import { ProducttypeListComponent } from './ProductType/producttype-list/producttype-list.component';
import { ProducttypeCuComponent } from './ProductType/producttype-cu/producttype-cu.component';
import { FImageComponent } from './Sample/Form/fimage/fimage.component';
import { ProductListComponent } from './Product/product-list/product-list.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { ProductCuComponent } from './Product/product-cu/product-cu.component';

const ROUTES: Routes = [ 
  { path: 'ProductList', component: ProductListComponent },
  /*{ path: 'RequestUpdList/:param1/:param2', component: ReqUpdateListComponent },
  { path: 'RequestCU/:param1/:param2/:param3', component: RequestUploadListComponent }*/
];

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RegistrationCUComponent,
    HttpClientModule,
    FImageComponent,
    ProductListComponent,
    ProducttypeListComponent,
    RouterModule.forRoot(ROUTES),
    RouterOutlet,
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
