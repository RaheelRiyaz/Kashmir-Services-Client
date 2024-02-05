import { Component, OnInit } from '@angular/core';
import { AddBrand } from 'src/app/Models/add-brand';
import { Brand } from 'src/app/Models/get-brand';
import { BrandsService } from 'src/app/services/brands.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  myBrands: Brand[] = [];
  showTable: boolean = true;
  showAddBrand: boolean = false;

  constructor(private service: BrandsService) {}

  ngOnInit(): void {
    this.getAllBrands();
  }
  getAllBrands() {
    this.service.getAllBrands().subscribe((data) => {
      this.myBrands = data.result;
    });
  }

  display() {
    this.showAddBrand = true;
    this.showTable = false;
  }

  deleteBrand(id: string) {
    environment
      .fireConfirmSwal('Are you sure You Want to Delete this Service?')
      .then((result) => {
        if (result.isConfirmed) {
          this.service.deleteBrand(id).subscribe((data) => {
            Swal.fire('Deleted!', 'Your Brand has been deleted.', 'success');
            this.getAllBrands();
          });
        }
      });
  }
}
