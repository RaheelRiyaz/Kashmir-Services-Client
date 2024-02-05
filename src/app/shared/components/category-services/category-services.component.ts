import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductSolutionResponse } from 'src/app/Models/ProductSolutionResponse';
import { AddressService } from 'src/app/services/address.service';
import { ServiceService } from 'src/app/services/service.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-category-services',
  templateUrl: './category-services.component.html',
  styleUrls: ['./category-services.component.css'],
})
export class CategoryServicesComponent implements OnInit {
  constructor(
    private productSolutionService: ServiceService,
    private activatedroute: ActivatedRoute,
    private addressesService: AddressService,
    public sharedService: SharedService,
  ) {}
  categoryId!: string;
  addresses: any;
  ngOnInit(): void {
    this.addressesService.getAddresses().subscribe({
      next: (response) => {
        this.addresses = response.Result;
      },
    });

    this.activatedroute.params.subscribe({
      next: (response) => {
        this.categoryId = response['id'];
      },
    });
    this.viewAllServicesByCategory();
  }
  services: ProductSolutionResponse[] = [];
  viewAllServicesByCategory() {
    this.productSolutionService
      .getServicesByCategoryId(this.categoryId)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.services = response.result;
        },
        error: () => {},
      });
  }
}
