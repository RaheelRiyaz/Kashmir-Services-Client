import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/Models/api-response';
import { Brand } from 'src/app/Models/get-brand';
import { Part } from 'src/app/Models/parts';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-parts',
  templateUrl: './add-parts.component.html',
  styleUrls: ['./add-parts.component.css']
})
export class AddPartsComponent implements OnInit {

  constructor( private service: BaseService,) { }
  parts:Part = new Part();
  partsArr:Part[] = [];

  brands:Brand[]=[];

  ngOnInit(): void {
    this.getAllBrands();
  }

  addPart(){
    this.service.Post<Part,ApiResponse<Part>>(this.parts,"parts").subscribe({
      next: (response) => {
       var res = response.result; 
        if(response.isSuccess){
          environment.fireSuccessSwal(response.message)
        }
      },
      error(err) {
        environment.fireErrorSwal(err.error.message)
      },
    });
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


   addBrand(brandId: string) {
    
  }
  }


