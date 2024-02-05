import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngineerRoutingModule } from './engineer-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { JobsheetComponent } from './pages/jobsheet/jobsheet.component';
import { VisitComponent } from './pages/visit/visit.component';
import { FormsModule } from '@angular/forms';
import { InvoiceComponent } from './pages/invoice/invoice.component';


@NgModule({
  declarations: [
    SidebarComponent,
    JobsheetComponent,
    VisitComponent,
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    EngineerRoutingModule,
    FormsModule
  ]
})
export class EngineerModule { }
