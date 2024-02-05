import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServicesComponent } from './services/services.component';
import { ServiceService } from '../services/service.service';
import { FormsModule } from '@angular/forms';
import { AdminSignupComponent } from './admin-signup/admin-signup.component';
import { CategoryComponent } from './category/category.component';
import { CategoryService } from '../services/category.service';
import { BrandsComponent } from './brands/brands.component';
import { BrandsService } from '../services/brands.service';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { CustomersComponent } from './customers/customers.component';
import { UserStatusPipe } from '../pipes/user-status.pipe';
import { EmployeesComponent } from './employees/employees.component';
import { ContactComponent } from './contact/contact.component';
import { CustomersNamePipe } from '../pipes/customers-name.pipe';
import { ManagersComponent } from './users/managers/managers.component';
import { AdminsComponent } from './users/admins/admins.component';
import { SharedModule } from '../shared/shared.module';
import { OurCustomersComponent } from './users/customers/customers.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { CategoryBrandComponent } from './category-brand/category-brand.component';
import { BookingsComponent } from './bookings/bookings.component';
import { EngineersComponent } from './users/engineers/engineers.component';
import { EngineerCategoriesComponent } from './engineer-categories/engineer-categories.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { StatusPipe } from '../pipes/status.pipe';
import { JobRolesComponent } from './job-roles/job-roles.component';
import { ManagerEngineersComponent } from './users/engineers/manager-engineers/manager-engineers.component';
import { EnginnerJobsheetComponent } from './engineer-jobsheets/engineer-jobsheets.component';
import { CallbookingJobsheetComponent } from './callbooking-jobsheet/callbooking-jobsheet.component';
import { ViewPartsComponent } from './parts/view-parts/view-parts.component';
import { AddPartsComponent } from './parts/add-parts/add-parts.component';


@NgModule({
  declarations: [
    AdminComponent,
    NavComponent,
    DashboardComponent,
    ServicesComponent,
    AdminSignupComponent,
    CategoryComponent,
    BrandsComponent,
    AddBrandComponent,
    EditBrandComponent,
    AddServiceComponent,
    EditServiceComponent,
    UserStatusPipe,
    EmployeesComponent,
    ContactComponent,
    CustomersNamePipe,
    AdminsComponent,
    ManagersComponent,
    CustomersComponent,
    OurCustomersComponent,
    EditUserComponent,
    CategoryBrandComponent,
    BookingsComponent,
    EngineersComponent,
    EngineerCategoriesComponent,
    TestimonialsComponent,
    StatusPipe,
    JobRolesComponent,
    ManagerEngineersComponent,
    EnginnerJobsheetComponent,
    CallbookingJobsheetComponent,
    ViewPartsComponent,
    AddPartsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SharedModule
  ],
  providers:[ServiceService,CategoryService,BrandsService]
})
export class AdminModule { }
