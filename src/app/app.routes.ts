import { Routes } from "@angular/router";
import { ProductListComponent } from "./Product/product-list/product-list.component";
import { ProductCuComponent } from "./Product/product-cu/product-cu.component";

export const routes: Routes = [
    { path: 'ProductList', component: ProductListComponent },
    { path: 'RequestCU/:param1/:param2', component: ProductCuComponent },
    { path: '', redirectTo: '/ProductList', pathMatch: 'full' }
  ];