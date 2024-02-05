import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { CategoriesComponent } from './pages/category/categories/categories.component';
import { CategoryEngineersComponent } from './pages/category/category-engineers/category-engineers.component';
import { JobsheetComponent } from './pages/jobsheet/jobsheet.component';
import { EngineersComponent } from './pages/engineers/engineers.component';
import { ChangePasswordComponent } from '../shared/components/change-password/change-password.component';
import { CallbookingJobsheetComponent } from './pages/callbooking-jobsheet/callbooking-jobsheet.component';
import { ViewInvoiceComponent } from '../shared/components/view-invoice/view-invoice.component';
import { ProfileComponent } from '../shared/components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      { path: '', component: CategoriesComponent },
      { path: 'bookings', component: BookingsComponent },
      { path: 'jobsheet/:id', component: JobsheetComponent },
      { path: 'callbooking-jobsheet/:id', component: CallbookingJobsheetComponent },
      {path: "changePassword", component: ChangePasswordComponent},
      { path: 'engineers', component: EngineersComponent },
      { path: 'view-invoice/:callBookingId', component: ViewInvoiceComponent },
      {path:'profile',component:ProfileComponent},

      {
        path: 'category',
        children: [
          { path: '', component: CategoriesComponent },
          { path: 'engineers/:id', component: CategoryEngineersComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
