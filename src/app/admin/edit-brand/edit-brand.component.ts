import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddBrand } from 'src/app/Models/add-brand';
import { BrandResponse } from 'src/app/Models/brandResponse';
import { CategoryResponse } from 'src/app/Models/category';
import { Brand } from 'src/app/Models/get-brand';
import { BaseService } from 'src/app/services/base.service';
import { BrandsService } from 'src/app/services/brands.service';
import { CategoryService } from 'src/app/services/category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css'],
})
export class EditBrandComponent implements OnInit {
  key: string = '';
  brand: BrandResponse = new BrandResponse();
  myArr: any;
  constructor(
    private baseService: BaseService,
    private ActivatedRoute: ActivatedRoute,
    private route: Router
  ) {}
  categories!: CategoryResponse[];
  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((searchParam) => {
      this.key = searchParam['id'];
      this.baseService.Find<BrandResponse>('brands/' + this.key).subscribe({
        next: (response) => {
          this.brand = response.result;
        },
        error: (err) => {
          console.log(err);
        },
      });
    });

    this.baseService.Fetch<CategoryResponse[]>('category').subscribe({
      next: (response) => {
        this.categories = response.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateBrand(id: string) {
    this.brand.id = id;
    this.baseService
      .Update<BrandResponse, BrandResponse>(this.brand, 'brands')
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            environment.fireSuccessSwal('Brand Updated Successfully');
            this.route.navigate(['/admin/brands']);
          }
        },
        error: (err) => {
          environment.fireErrorSwal(err.error.message);
        },
      });
  }
}
