import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServicesComponent } from './services/services.component';
import { AdminSignupComponent } from './admin-signup/admin-signup.component';
import { CategoryComponent } from './category/category.component';
import { BrandsComponent } from './brands/brands.component';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { CustomersComponent } from './customers/customers.component';
import { EmployeesComponent } from './employees/employees.component';
import { ContactComponent } from './contact/contact.component';
import { ManagersComponent } from './users/managers/managers.component';
import { OurCustomersComponent } from './users/customers/customers.component';
import { AdminsComponent } from './users/admins/admins.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { CategoryBrandComponent } from './category-brand/category-brand.component';
import { BookingsComponent } from './bookings/bookings.component';
import { EngineersComponent } from './users/engineers/engineers.component';
import { EngineerCategoriesComponent } from './engineer-categories/engineer-categories.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ChangePasswordComponent } from '../shared/components/change-password/change-password.component';
import { JobRolesComponent } from './job-roles/job-roles.component';
import { ManagerEngineersComponent } from './users/engineers/manager-engineers/manager-engineers.component';
import { EnginnerJobsheetComponent as EngineerJobsheetsComponent } from './engineer-jobsheets/engineer-jobsheets.component';
import { CallbookingJobsheetComponent } from './callbooking-jobsheet/callbooking-jobsheet.component';
import { ViewInvoiceComponent } from '../shared/components/view-invoice/view-invoice.component';
import { ViewPartsComponent } from './parts/view-parts/view-parts.component';
import { AddPartsComponent } from './parts/add-parts/add-parts.component';
import { ProfileComponent } from '../shared/components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'adminsignup', component: AdminSignupComponent },
      {path: "changePassword", component: ChangePasswordComponent},
      { path: 'bookings', component: BookingsComponent },
      { path: 'engineer-jobsheets/:id', component: EngineerJobsheetsComponent },
      { path: 'callbooking-jobsheets/:id', component: CallbookingJobsheetComponent },
      { path: 'testimonials', component: TestimonialsComponent },
      { path: 'view-invoice/:callBookingId', component: ViewInvoiceComponent },
      { path: 'view-parts', component: ViewPartsComponent },
       { path: 'add-parts', component: AddPartsComponent  },

      {
        path: 'category',
        children: [
          { path: '', component: CategoryComponent },
          { path: 'brands/:id', component: CategoryBrandComponent },
          { path: 'jobroles/:id', component: JobRolesComponent },
          { path: 'parts/:id', component: ViewPartsComponent },
        ],
      },
      { path: 'brands', component: BrandsComponent },
      { path: 'addBrand', component: AddBrandComponent },
      { path: 'editBrand/:id', component: EditBrandComponent },
      { path: 'addService', component: AddServiceComponent },
      { path: 'editService/:id', component: EditServiceComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'contact', component: ContactComponent },
      {
        path: 'users',
        children: [
          { path: 'managers', component: ManagersComponent },
          { path: 'engineers', component: EngineersComponent },
          { path: 'manager-engineers/:id', component: ManagerEngineersComponent },
          { path: 'managers/categories/:id', component: EngineerCategoriesComponent },
          { path: 'customers', component: OurCustomersComponent },
          { path: 'admins', component: AdminsComponent },
          { path: 'edit/:id', component: EditUserComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
