import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductSolutionResponse } from 'src/app/Models/ProductSolutionResponse';
import { BaseService } from 'src/app/services/base.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-brand-services',
  templateUrl: './brand-services.component.html',
  styleUrls: ['./brand-services.component.css'],
})
export class BrandServicesComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: BaseService,
    public sharedService: SharedService,
  ) {}
  brandId!: string;
  services: ProductSolutionResponse[] = [];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => (this.brandId = res['id']));
    this.service
      .Fetch<ProductSolutionResponse[]>('servicetype/all/' + this.brandId)
      .subscribe({
        next: (response) => {
          this.services=response.result;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
