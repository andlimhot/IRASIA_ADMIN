import { Routes } from "@angular/router";
import { ProductListComponent } from "./Product/product-list/product-list.component";
import { ProductCuComponent } from "./Product/product-cu/product-cu.component";
import { ProducttypeListComponent } from "./ProductType/producttype-list/producttype-list.component";

export const routes: Routes = [
    { path: 'ProductList', component: ProductListComponent },
    { path: 'ProducttypeList', component: ProducttypeListComponent },
    { path: 'RequestCU/:param1/:param2', component: ProductCuComponent },
    { path: '', redirectTo: '/ProductList', pathMatch: 'full' },
    { path: '', redirectTo: '/ProducttypeList', pathMatch: 'full' }
  ];