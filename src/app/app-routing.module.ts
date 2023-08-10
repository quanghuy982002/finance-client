import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CustomerDetailComponent } from './category/customer-detail/customer-detail.component';
import { CustomerComponent } from './category/customer/customer.component';

const routes: Routes = [
  { path: '', component: MainComponent, 
    children:[
      { path: 'customer', component: CustomerComponent },
      { path: 'customer/detail/:id', component: CustomerDetailComponent }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
