import { Component, OnInit } from '@angular/core';
import { ProductSolutionResponse } from 'src/app/Models/ProductSolutionResponse';
import { AddressService } from 'src/app/services/address.service';
import { ServiceService } from 'src/app/services/service.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-shared-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  constructor(
    private service: ServiceService,
    private addressesService: AddressService,
    public sharedService: SharedService
  ) {}
  services!: ProductSolutionResponse[];
  addresses: any;
  ngOnInit(): void {
    this.addressesService.getAddresses().subscribe({
      next: (response) => {
        this.addresses = response.Result;
      },
    });
    this.service.getServices().subscribe({
      next: (response) => {
        this.services = response.result;
      },
      error: () => {},
    });
  }
}
