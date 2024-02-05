import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Engineer, User } from 'src/app/Models/user';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-category-engineers',
  templateUrl: './category-engineers.component.html',
  styleUrls: ['./category-engineers.component.css'],
})
export class CategoryEngineersComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: BaseService
  ) {}
  categoryId!: string;
  engineers: Engineer[] = [];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (res) => (this.categoryId = res['id']),
    });
    this.service
      .Fetch<Engineer[]>(`manager/all-engineers/${this.categoryId}`)
      .subscribe({
        next: (response) => {
          this.engineers = response.result;
          console.log(response);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
