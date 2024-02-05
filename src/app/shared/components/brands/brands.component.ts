import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/Models/get-brand';
import { BaseService } from 'src/app/services/base.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  constructor(
    private service: BaseService,
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute
  ) {}
  categoryId!: string;
  token!:string;
  brands: Brand[] = [];
  ngOnInit(): void {
    this.token=this.sharedService.getToken();
    this.activatedRoute.params.subscribe({
      next: (response) => (this.categoryId = response['id']),
    });

    this.service
      .Fetch<Brand[]>('brands/categoryId/' + this.categoryId)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.brands=response.result;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
