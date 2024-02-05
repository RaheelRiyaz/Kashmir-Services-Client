import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductSolutionResponse } from 'src/app/Models/ProductSolutionResponse';
import { ServiceRequest } from 'src/app/Models/serviceRequest';
import { BrandsService } from 'src/app/services/brands.service';
import { ServiceService } from 'src/app/services/service.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css'],
})
export class AddServiceComponent implements OnInit {
  addServiceModel: ServiceRequest = new ServiceRequest();
  brands: any;
  categories: any;
  nameExist = false;

  constructor(
    private service: ServiceService,
    private brandsService: BrandsService,
    private Router: Router
  ) {}

  ngOnInit(): void {
    this.brandsService.getAllBrands().subscribe((data) => {
      this.brands = data.result;
    });
    this.service.getCategories().subscribe((data) => {
      this.categories = data.result;
    });
  }

  checkName(name: string) {
    this.service.checkName(name).subscribe((response) => {
      this.nameExist = response;
    });
  }
  postModel() {
    this.service.addService(this.addServiceModel).subscribe((data) => {
      environment.fireSuccessSwal('Service Added Successfully');
      this.Router.navigate(['/admin/services']);
    });
  }
}
