import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { JobsheetComponent } from './pages/jobsheet/jobsheet.component';
import { JobroleComponent } from './pages/jobrole/jobrole.component';
import { VisitComponent } from './pages/visit/visit.component';
import { ChangePasswordComponent } from '../shared/components/change-password/change-password.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { ViewInvoiceComponent } from '../shared/components/view-invoice/view-invoice.component';
import { ProfileComponent } from '../shared/components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      { path: '', component: JobsheetComponent },
      { path: 'jobsheet', redirectTo: '', pathMatch: 'full' },
      { path: "changePassword", component: ChangePasswordComponent },
      { path: 'jobroles', component: JobroleComponent },
      { path: 'visit/:id/:callStatus/:callBookingId', component: VisitComponent },
      { path: 'invoice/:id/:callBookingId', component: InvoiceComponent },
      { path: 'view-invoice/:callBookingId', component: ViewInvoiceComponent },
      { path: 'profile', component: ProfileComponent }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EngineerRoutingModule { }
