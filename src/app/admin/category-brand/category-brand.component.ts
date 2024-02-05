import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddBrand } from 'src/app/Models/add-brand';
import { BrandsService } from 'src/app/services/brands.service';
import { CategoryService } from 'src/app/services/category.service';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-band',
  templateUrl: './category-brand.component.html',
  styleUrls: ['./category-brand.component.css'],
})
export class CategoryBrandComponent implements OnInit {
  constructor(
    private service: BrandsService,
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute
  ) {}
  newBrand: AddBrand = new AddBrand();
  checkBrands: boolean = false;
  categoryId!: string;
  brands: any;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.categoryId = response['id'];
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.getBrands();
  }

  getBrands(): void {
    this.service.getBrandsByCategoryId(this.categoryId).subscribe({
      next: (response) => {
        console.log(response);
        this.brands = response.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  checkBrandName(bName: string) {
    this.sharedService
      .isExists(`brands/check-brandname/${bName}`)
      .subscribe((response) => {
        this.checkBrands = !response;
      });
  }
  addBrand(): void {
    this.newBrand.categoryId = this.categoryId;
    this.service.postBrand(this.newBrand).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          environment.fireSuccessSwal('Brand Added Successfully');
          this.getBrands();
        } else {
          environment.fireErrorSwal(response.message);
        }
      },
      error: (err) => {
        environment.fireErrorSwal(err.error.message);
      },
    });
  }

  deleteBrand(id: any) {
    environment
      .fireConfirmSwal('Are you sure you want to delete?')
      .then((res) => {
        if (res.isConfirmed) {
          this.sharedService.deleteItem<any>('brands', id).subscribe({
            next: (response) => {
              if (response.isSuccess) {
                environment.fireSuccessSwal(response.message);
                this.getBrands();
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
