import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSolutionResponse } from 'src/app/Models/ProductSolutionResponse';
import { BrandsService } from 'src/app/services/brands.service';
import { ServiceService } from 'src/app/services/service.service';
import { UpdateService } from 'src/app/services/serviceUpdateRequest';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css'],
})
export class EditServiceComponent implements OnInit {
  key: string = '';
  mangers: any;
  brands: any;
  serviceRequest: ProductSolutionResponse = new ProductSolutionResponse();

  constructor(
    private service: ServiceService,
    private ac: ActivatedRoute,
    private Router: Router,
    private brandService: BrandsService
  ) {
    this.ac.params.subscribe((param) => {
      this.key = param['id'];
    });
  }

  ngOnInit(): void {
    this.getById();
    this.service.getManagers().subscribe((res) => {
      this.mangers = res.Result;
    });
    // this.service.getCategories().subscribe((res) => {
    //   console.log(res);
    //   this.categories = res.result;
    // });

    this.brandService.getAllBrands().subscribe({
      next: (response) => {
        console.log(response);
        
        this.brands = response.result;
      },
    });
  }

  getById() {
    this.service.getById(this.key).subscribe((data) => {
      this.serviceRequest = data.result;
      console.log(data);
      
    });
  }

  updateModel(value: any) {
    value.id = this.key;
    this.service
      .updateService(value)
      .subscribe((data) => {
        environment.fireSuccessSwal(data.message);
        this.Router.navigate(['/admin/services']);
      });
  }
}
