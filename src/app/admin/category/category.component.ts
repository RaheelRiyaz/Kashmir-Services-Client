import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/Models/api-response';
import { AssignEngineer } from 'src/app/Models/assignEngineer';
import {
  CategoryResponse,
  CategoryRequest,
  CategoryUpdateRequest,
} from 'src/app/Models/category';
import { Manager } from 'src/app/Models/manager';
import { Engineer } from 'src/app/Models/user';
import { CategoryService } from 'src/app/services/category.service';
import { ManagerService } from 'src/app/services/manager.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: CategoryResponse[] = [];
  baseUrl: string = '';
  showCat: boolean = false;
  showCard: boolean = true;
  showMe: boolean = true;
  categoryRequest: CategoryRequest = new CategoryRequest();
  categoryUpdateRequest: CategoryUpdateRequest = new CategoryUpdateRequest();
  showCategory: boolean = false;
  jobRole: AssignEngineer = new AssignEngineer();
  key: string = '';
  engineers!: any[];
  managers!: any[];
  checkCategory = false;
  constructor(
    private service: CategoryService,
    private Router: Router,
    private userService: UsersService,
    private managerService: ManagerService
  ) {
    this.baseUrl = environment.baseUrl;
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.userService.getUsersForDropdown('engineer-names').subscribe({
      next: (response) => {
        this.engineers = response.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.userService.getUsersForDropdown('managers-names').subscribe({
      next: (response) => {
        this.managers = response.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  check(categoryName: string) {
    this.service.checkCategory(categoryName).subscribe((response) => {
      this.checkCategory = !response;
    });
  }

  AddCategory() {
    this.showCard = false;
    this.showCat = true;
    this.showMe = false;
  }
  hello() {
    this.showCard = true;
    this.showMe = true;
    this.showCat = false;
    this.showCategory = false;
  }

  getAllCategories() {
    this.service.getCategories().subscribe((response) => {
      if (response.isSuccess) {
        this.categories = response.result;
      }
    });
  }

  back() {
    this.showCard = true;
    this.showMe = true;
    this.showCategory = false;
  }
  form(event: any) {
    const myFormData = new FormData(event.target);
    this.service.addCategory(myFormData).subscribe(
      (res) => {
        console.log(res);
        
        if (res.isSuccess) {
          environment.fireSuccessSwal(res.message);
          this.showCat = false;
          this.showCard = true;
          this.showMe = true;
          this.categoryRequest = new CategoryRequest();
          this.getAllCategories();
        }
      },
      (errorResponse) => {
        if (
          errorResponse.error.statusCode === HttpStatusCode.Conflict ||
          errorResponse.error.statusCode === HttpStatusCode.InternalServerError
        )
          environment.fireErrorSwal(errorResponse.error.message);
      }
    );
  }
  editCategory(id: any) {
    this.showCategory = true;
    this.showCard = false;
    this.showCat = false;
    this.showMe = false;
    this.key = id;

    this.service.getCategoryById(id).subscribe(
      (response) => {
        if (response.isSuccess) {
          this.categoryUpdateRequest = <CategoryUpdateRequest>response.result;
        }
      },
      (errorRes) => {
        if (errorRes.error.statusCode === HttpStatusCode.NotFound)
          environment.fireErrorSwal(errorRes.error.message);
      }
    );
  }
  updateCategory(event: any) {
    let formData = new FormData(event.target);
    formData.append('id', this.key);
    this.service.updateCategory(formData).subscribe(
      (response) => {
        if (response.isSuccess) environment.fireSuccessSwal(response.message);
        this.showCategory = false;
        this.showCard = true;
        this.showMe = true;
        this.getAllCategories();
      },
      (errResponse) => {
        if (
          errResponse.error.statusCode == HttpStatusCode.Conflict ||
          errResponse.error.statusCode == HttpStatusCode.NotFound ||
          errResponse.error.statusCode == HttpStatusCode.InternalServerError
        ) {
          environment.fireErrorSwal(errResponse.error.message);
        }
      }
    );
  }

  deleteCategory(id: any) {
    environment
      .fireConfirmSwal('Are you sure You Want to Delete this Service?')
      .then((result) => {
        if (result.isConfirmed) {
          this.service.deleteCategory(id).subscribe(
            (response) => {
              console.log(response);
              
              if (response.isSuccess) {
                environment.fireSuccessSwal(response.message);
              }
              this.getAllCategories();
            },
            (errorResponse) => {
              if (
                errorResponse.error.statusCode === HttpStatusCode.Conflict ||
                errorResponse.error.statusCode === HttpStatusCode.NotFound ||
                errorResponse.error.statusCode ===
                  HttpStatusCode.InternalServerError
              )
                environment.fireErrorSwal(errorResponse.error.message);
            }
          );
        }
      });
  }

  assignEngineer(categoryId: any): void {
    this.jobRole.categoryId = categoryId;
    environment
      .fireConfirmSwal(
        'Are you sure you want to assign this Category to this Enginner?'
      )
      .then((res) => {
        if (res.isConfirmed) {
          this.managerService.assignEngineer(this.jobRole).subscribe({
            next: (response) => {
              console.log(response);
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
