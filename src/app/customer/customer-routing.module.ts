import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
// import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { PostAddressComponent } from './pages/post-address/post-address.component';
import { UpdateAddressComponent } from './pages/update-address/update-address.component';
import { DeleteAddressComponent } from './pages/delete-address/delete-address.component';
import { SettingComponent } from './setting/setting.component';
import { ServicesComponent } from '../shared/components/services/services.component';
import { BookServiceComponent } from './pages/book-service/book-service.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { CategoryComponent } from '../shared/components/category/category.component';
import { BrandsComponent } from '../shared/components/brands/brands.component';
import { BrandServicesComponent } from '../shared/components/brand-services/brand-services.component';
import { TestimonialComponent } from './pages/testimonial/testimonial.component';
import { ChangePasswordComponent } from '../shared/components/change-password/change-password.component';
import { ViewInvoiceComponent } from './pages/view-invoice/view-invoice.component';
import { ProfileComponent } from '../shared/components/profile/profile.component';


const routes: Routes = [
  {
    path: "", component: CustomerComponent,
    children: [
      { path: '', component: CategoryComponent },
      { path: 'bookings', component: BookingsComponent },
      { path: 'category/brands/:id', component: BrandsComponent },
      { path: 'category/brands/services/:id', component: BrandServicesComponent },
      { path: 'testimonials', component: TestimonialComponent },
      { path: 'view-invoice/:callBookingId', component: ViewInvoiceComponent },
      {
        path: "changePassword", component: ChangePasswordComponent
      },
      {
        path: "postAddress", component: PostAddressComponent
      },
      {
        path: "updateAddress", component: UpdateAddressComponent
      },
      {
        path: "deleteAddress", component: DeleteAddressComponent
      },
      { path: "setting", component: SettingComponent },
      { path: "bookservice/:id", component: BookServiceComponent },
      {
        path: "profile", component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
