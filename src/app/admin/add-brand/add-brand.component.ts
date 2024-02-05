import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddBrand } from 'src/app/Models/add-brand';
import { BrandResponse } from 'src/app/Models/brandResponse';
import { CategoryResponse } from 'src/app/Models/category';
import { Brand } from 'src/app/Models/get-brand';
import { BaseService } from 'src/app/services/base.service';
import { BrandsService } from 'src/app/services/brands.service';
import { CategoryService } from 'src/app/services/category.service';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css'],
})
export class AddBrandComponent implements OnInit {
  postBrand: AddBrand = new AddBrand();
  checkBrands = false;
  categories!: CategoryResponse[];

  constructor(
    private service: BrandsService,
    private sharedService: SharedService,
    private Router: Router,
    private categoryService: CategoryService,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // checkBrandName(bName: string) {
  //   this.sharedService
  //     .isExists(`brands/check-brandname/${bName}`)
  //     .subscribe((response) => {
  //       this.checkBrands = !response;
  //     });
  // }

  postModel() {
    this.baseService.Post<AddBrand, BrandResponse>(this.postBrand, 'brands').subscribe({
      next: (data) => {
        if (data.isSuccess) {
          environment.fireSuccessSwal('Brand added Successfully');
          this.Router.navigate(['/admin/brands']);
        } else {
          environment.fireSuccessSwal(data.message);
        }
      },
      error: (err) => {
        environment.fireSuccessSwal(err.error.message);
      },
    });
  }
}
