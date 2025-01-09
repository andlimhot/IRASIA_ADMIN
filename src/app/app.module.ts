import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationCUComponent } from './Registration/Forms/registration-cu/registration-cu.component';
import { HttpClientModule } from '@angular/common/http';
import { ProducttypeListComponent } from './ProductType/producttype-list/producttype-list.component';
import { ProducttypeCuComponent } from './ProductType/producttype-cu/producttype-cu.component';
import { FImageComponent } from './Sample/Form/fimage/fimage.component';

@NgModule({
  declarations: [
    AppComponent,
    ProducttypeListComponent,
    ProducttypeCuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RegistrationCUComponent,
    HttpClientModule,
    FImageComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
