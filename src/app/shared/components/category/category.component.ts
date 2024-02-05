import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductSolutionResponse } from 'src/app/Models/ProductSolutionResponse';
import { CategoryResponse } from 'src/app/Models/category';
import { CategoryService } from 'src/app/services/category.service';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories!: CategoryResponse[];
  baseUrl: string = '';
  services!: ProductSolutionResponse[];
  @Input() length!: number;
  constructor(
    private router: Router,
    private service: CategoryService,
    private sharedService: SharedService
  ) {
    this.baseUrl = environment.baseUrl;
  }
  token = this.sharedService.getToken();
  brandId!: string;
  ngOnInit(): void {
    console.log(this.token);

    this.service.getCategories().subscribe({
      next: (response) => {
        if (this.length > 0)
          this.categories = response.result.slice(0, this.length);
        else this.categories = response.result;
        console.log(response);
      },
      error: () => {},
    });
  }
}
