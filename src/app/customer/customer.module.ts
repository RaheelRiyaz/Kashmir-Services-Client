import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { NavComponent } from './nav/nav.component';
import { SettingComponent } from './setting/setting.component';
import { FormsModule } from '@angular/forms';
import { PostAddressComponent } from './pages/post-address/post-address.component';
import { DeleteAddressComponent } from './pages/delete-address/delete-address.component';
import { UpdateAddressComponent } from './pages/update-address/update-address.component';
import { BookServiceComponent } from './pages/book-service/book-service.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { SharedModule } from '../shared/shared.module';
import { TestimonialComponent } from './pages/testimonial/testimonial.component';
import { ViewInvoiceComponent } from './pages/view-invoice/view-invoice.component';


@NgModule({
  declarations: [
    CustomerComponent,
    NavComponent,
    SettingComponent,
    PostAddressComponent,
    DeleteAddressComponent,
    UpdateAddressComponent,
    BookServiceComponent,
    BookingsComponent,
    TestimonialComponent,
    ViewInvoiceComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class CustomerModule { }
