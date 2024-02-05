import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/Models/address';
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
    private addressService: AddressService,
    private service: ProductSolutionService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
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
        this.booking.serviceTypeId = this.productSolutionId;
      },
    });
  }

  navigateAndStore() {
    sessionStorage.setItem('productSolutionId', this.productSolutionId);
  }

  bookService(): void {
    this.service.bookService(this.booking).subscribe({
      next: (response) => {
        console.log(response);
        if (response.isSuccess) {
          environment.fireSuccessSwal('Service Booked Successfully');
          this.route.navigate(['/customer'])
        } else {
          environment.fireErrorSwal('Service Booked Successfully');
        }
      },
      error: (err) => {
        environment.fireErrorSwal(err.error.message);
      },
    });
  }
}
