import { Routes } from "@angular/router";
import { ProductListComponent } from "./Product/product-list/product-list.component";
import { ProductCuComponent } from "./Product/product-cu/product-cu.component";
import { ProducttypeListComponent } from "./ProductType/producttype-list/producttype-list.component";
import { RegistrationCUComponent } from "./Registration/Forms/registration-cu/registration-cu.component";
import { ListRequestComponent } from "./RequestEC/Forms/list-request/list-request.component";
import { LoginCompComponent } from "./login/Components/login-comp/login-comp.component";

export const routes: Routes = [
    { path: '', redirectTo: '/Login', pathMatch: 'full' },
    { path: '/Login', component: LoginCompComponent },
    { path: 'ProductList', component: ProductListComponent },
    { path: 'ProducttypeList', component: ProducttypeListComponent },
   // { path: 'RequestList', component: ListRequestComponent },
    { path: '', redirectTo: '/ProductList', pathMatch: 'full' },
    { path: '', redirectTo: '/ProducttypeList', pathMatch: 'full' },
    { path: '', redirectTo: '/RegistrationList', pathMatch: 'full' },
    //{ path: '', redirectTo: '/RequestList', pathMatch: 'full' },
  ];