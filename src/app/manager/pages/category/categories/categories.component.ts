import { Component, OnInit } from '@angular/core';
import { AssignEngineer } from 'src/app/Models/assignEngineer';
import { CategoryResponse } from 'src/app/Models/category';
import { Manager } from 'src/app/Models/manager';
import { BaseService } from 'src/app/services/base.service';
import { ManagerService } from 'src/app/services/manager.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(
    private managerService: ManagerService,
    private Service: BaseService,
    private userService: UsersService
  ) {}
  managers!: any[];
  jobRole: AssignEngineer = new AssignEngineer();
  categories: CategoryResponse[] = [];
  baseUrl = environment.baseUrl;
  ngOnInit(): void {
    this.getEngineers();
    this.getCategories();
    // this.Service.Fetch<any>(
    //   'manager/engineers/category/85b7818-d65b-4c15-ac63-838797477f1b'
    // ).subscribe({
    //   next: (response) => {
    //     console.log(response);
    //   },
    // });
  }

  getCategories(): void {
    this.managerService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.result;
      },
    });
  }
  getEngineers(): void {
    this.Service.Fetch<any>('manager/all-engineers/managerid').subscribe({
      next: (response) => {
        console.log(response);
        this.managers = response.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  assignEngineer(categoryId: any,engineerId:string): void {
    this.jobRole.categoryId = categoryId;
    this.jobRole.engineerId = engineerId;
    environment
      .fireConfirmSwal(
        'Are you sure you want to assign this Category to this Enginner?'
      )
      .then((res) => {
        if (res.isConfirmed) {
          this.managerService.assignEngineer(this.jobRole).subscribe({
            next: (response) => {
              if (response.isSuccess) {
                environment.fireSuccessSwal(response.message);
              } else {
                environment.fireErrorSwal(response.message);
              }
            },
            error: (err) => {
              environment.fireErrorSwal(err.error.message);
            },
          });
        }
      });
  }
}
