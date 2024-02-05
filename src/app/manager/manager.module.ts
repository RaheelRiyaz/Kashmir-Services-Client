import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CategoriesComponent } from './pages/category/categories/categories.component';
import { FormsModule } from '@angular/forms';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { CategoryEngineersComponent } from './pages/category/category-engineers/category-engineers.component';
import { JobroleComponent } from '../engineer/pages/jobrole/jobrole.component';
import { JobsheetComponent } from './pages/jobsheet/jobsheet.component';
import { EngineersComponent } from './pages/engineers/engineers.component';
import { CallbookingJobsheetComponent } from './pages/callbooking-jobsheet/callbooking-jobsheet.component';


@NgModule({
  declarations: [
    SidebarComponent,
    CategoriesComponent,
    BookingsComponent,
    CategoryEngineersComponent,
    JobroleComponent,
    JobsheetComponent,
    EngineersComponent,
    CallbookingJobsheetComponent,

  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    FormsModule
  ]
})
export class ManagerModule { }
