import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { CustomerGuard } from './Auths/customer-guard';
import { AdminGuard } from './Auths/admin.guard';
import { ManagerModule } from './manager/manager.module';
import { ManagerGuard } from './Auths/manager.guard';
import { EngineerModule } from './engineer/engineer.module';
import { EngineerGuard } from './Auths/engineer.guard';

const routes: Routes = [
  {path:"",loadChildren:()=>import('./user/user.module').then(m=>m.UserModule)},
  {path:"admin",loadChildren:()=>AdminModule,canActivate:[AdminGuard]},
  {path:"customer",loadChildren:()=>CustomerModule,canActivate:[CustomerGuard]},
  {path:"manager",loadChildren:()=>ManagerModule,canActivate:[ManagerGuard]},
  {path:"engineer",loadChildren:()=>EngineerModule,canActivate:[EngineerGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
