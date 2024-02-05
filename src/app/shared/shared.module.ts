import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './components/services/services.component';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { CategoryServicesComponent } from './components/category-services/category-services.component';
import { BookServiceComponent } from './components/book-service/book-service.component';
import { UserComponent } from './components/user/user.component';
import { LocationSelectorComponent } from './components/location-selector/location-selector.component';
import { FormsModule } from '@angular/forms';
import { BrandsComponent } from './components/brands/brands.component';
import { BrandServicesComponent } from './components/brand-services/brand-services.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ViewInvoiceComponent } from './components/view-invoice/view-invoice.component';
import { EmailverificationPipe } from '../pipes/emailverifiation.pipe';
import { ProfileComponent } from './components/profile/profile.component';
import { AddressComponent } from './components/address/address.component';

@NgModule({
  declarations: [
    ServicesComponent,
    CategoryComponent,
    CategoryServicesComponent,
    BookServiceComponent,
    UserComponent,
    LocationSelectorComponent,
    BrandsComponent,
    BrandServicesComponent,
    FooterComponent,
    ChangePasswordComponent,
    ViewInvoiceComponent,
    EmailverificationPipe,
    ProfileComponent,
    AddressComponent

  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    ServicesComponent,
    CategoryComponent,
    RouterModule,
    UserComponent,
    LocationSelectorComponent,
    BrandsComponent,
    BrandServicesComponent,
    FooterComponent,
    EmailverificationPipe,
    ProfileComponent
  ],
})
export class SharedModule {}
