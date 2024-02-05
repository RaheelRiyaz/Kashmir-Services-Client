import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/Models/address';
import { AddressResponse } from 'src/app/Models/addressResponse';
import { ApiResponse } from 'src/app/Models/api-response';
import { BookService } from 'src/app/Models/bookService';
import { AddressService } from 'src/app/services/address.service';
import { ProductSolutionService } from 'src/app/services/product-solution.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-service',
  templateUrl: './book-service.component.html',
  styleUrls: ['./book-service.component.css'],
})
export class BookServiceComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private addressService: AddressService,
    private productSolutionService: ProductSolutionService,
    private router: Router
  ) {}
  addresses: Address[] = [];
  productSolutionId!: string;
  booking: BookService = new BookService();
  ngOnInit(): void {
    this.addressService.getAddressesByEntity().subscribe({
      next: (response) => {
        this.addresses = response.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.productSolutionId = response['id'];
      },
    });
  }

  bookService(addressId: any, street?: string) {
    // this.booking.productSolutionId = this.productSolutionId;
    // this.booking.addressId = addressId;
    // this.productSolutionService.bookService(this.booking).subscribe({
    //   next: (response) => {
    //     if (response.isSuccess) {
    //       environment.fireSuccessSwal(
    //         `Service booked to your address ${street} Successfully'`
    //       );
    //       this.router.navigate(['/customer']);
    //     }
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }

  navigateAndStore() {
    sessionStorage.setItem('productSolutionId', this.productSolutionId);
  }
}
