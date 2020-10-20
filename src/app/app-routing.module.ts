import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MerchantDashboardComponent } from './merchant-dashboard/merchant-dashboard.component';
import { MerchantLoginComponent } from './merchant-login/merchant-login.component';
import { MerchantRegistrationComponent } from './merchant-registration/merchant-registration.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

const routes: Routes = [
                        {path:'',component:HomeComponent},
                        {path:'user-register',component:UserRegistrationComponent},
                        {path:'merchant-register',component:MerchantRegistrationComponent},
                        {path:'merchant-login',component:MerchantLoginComponent},
                        {path:'merchant-dashboard/:id',component:MerchantDashboardComponent}
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
