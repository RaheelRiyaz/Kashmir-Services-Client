import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { UniqueComponent } from './unique/unique.component';
import { AboutComponent } from './about/about.component';
import { ResetComponent } from './reset/reset.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { CategoryServicesComponent } from '../shared/components/category-services/category-services.component';
import { BrandsComponent } from '../shared/components/brands/brands.component';
import { BrandServicesComponent } from '../shared/components/brand-services/brand-services.component';
import { CategoryComponent } from '../shared/components/category/category.component';

const routes: Routes = [
  {path:"",component:UserComponent,
  children:[
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"home",component:HomeComponent},
    {path:"signup",component:SignupComponent},
    {path:"login",component:LoginComponent},
    {path:"services",component:ServicesComponent},
    {path:"unique",component:UniqueComponent},
    {path:"about",component:AboutComponent},
    {path:"resetpassword",component:ChangePassComponent},
    {path:"reset",component:ResetComponent},
    {path:"verifyemail",component:VerifyEmailComponent},
    {path:"categories",component:CategoryComponent},
    {path:"categoryServices/:id",component:CategoryServicesComponent},
    {path:"category/brands/:id",component:BrandsComponent},
    {path:"category/brand/services/:id",component:BrandServicesComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
