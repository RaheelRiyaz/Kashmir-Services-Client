import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { NavComponent } from './nav/nav.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AccountService } from '../services/account.service';
import { FormsModule } from '@angular/forms';
import { ServicesComponent } from './services/services.component';
import { UniqueComponent } from './unique/unique.component';
import { AboutComponent } from './about/about.component';
import { ResetComponent } from './reset/reset.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { SharedModule } from '../shared/shared.module';
import { TestimonialComponent } from './testimonial/testimonial.component';


@NgModule({
  declarations: [
    UserComponent,
    NavComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ServicesComponent,
    UniqueComponent,
    AboutComponent,
    ResetComponent,
    ChangePassComponent,
    VerifyEmailComponent,
    TestimonialComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    SharedModule
  ],
  providers:[AccountService]
  
})
export class UserModule { }
