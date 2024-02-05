import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryResponse } from 'src/app/Models/category';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-engineer-categories',
  templateUrl: './engineer-categories.component.html',
  styleUrls: ['./engineer-categories.component.css'],
})
export class EngineerCategoriesComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: BaseService
  ) {}
  managerId!: string;
  baseUrl: string=environment.baseUrl;
  categories: CategoryResponse[] = [];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => (this.managerId = response['id']),
    });

    this.service
      .Fetch<CategoryResponse[]>(
        'manager/categories/managerId?managerid=' + this.managerId
      )
      .subscribe({
        next: (response) => {
          this.categories=response.result;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
