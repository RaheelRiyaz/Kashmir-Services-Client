import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/Models/get-brand';
import { Part } from 'src/app/Models/parts';
import { BaseService } from 'src/app/services/base.service';
import { PartsService } from 'src/app/services/parts.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-parts',
  templateUrl: './view-parts.component.html',
  styleUrls: ['./view-parts.component.css']
})
export class ViewPartsComponent implements OnInit {
  constructor(
    private partsService: PartsService,
    private service: BaseService,
    private activatedRoute: ActivatedRoute
  ) {}
  parts:Part[]=[];
  brandId!: string;
  brands:Brand[]=[];
  ngOnInit(): void {
    // Getting Id from route
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.brandId = response['id'];
      },
    });
    this.getAllBrands();
    this.getAllParts();
    // Service Call
    // this.partsService.getPartsByBrandId(this.brandId).subscribe({
    //   next: (response) => {
    //     console.log(response);
    //     this.parts = response.result;
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
    
  }

  
 getAllParts(): void {
  this.service.Fetch<Part[]>('parts').subscribe({
    next: (response) => {
      this.parts = response.result;
      console.log(this.parts)
    },
    error(err) {
      console.log(err);
    },
  });
}

showAll(){
  this.getAllParts();
 }



 getAllBrands(){
  this.service.Fetch<Brand[]>('brands').subscribe({
    next: (response) => {
      this.brands = response.result;
      console.log(this.parts)
    },
    error(err) {
      console.log(err);
    },
  });
 }

searchByPartNo(partNo:string){
  this.service.Fetch<Part[]>('parts/partNo/'+partNo).subscribe({
    next: (response) => {
      this.parts = response.result;
      console.log(this.parts)
    },
    error: (err) => {
      this.parts = [];

      console.log(err);
    },
  });
}


filterByBrand(brandId: string) {
  this.service
    .Fetch<Part[]>(
      `parts/brand/${brandId}`
    )
    .subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.parts = response.result;
        }
      },
      error: (err) => {
        environment.fireErrorSwal(err.error.message);
      },
    });
}
}
