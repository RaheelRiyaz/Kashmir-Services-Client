import { HttpStatusCode } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/Models/post-service';
import { ServiceService } from 'src/app/services/service.service';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  servicesArray: any[] = [];
  addServiceModel: PostService = new PostService();
  ServiceModel: PostService = new PostService();
  pageNo = 1;
  private readonly pageSize: number = 5;
  @ViewChildren('page') pages!: QueryList<ElementRef>;
  @ViewChildren('pagesContainer') pagesContainer!: ElementRef;
  constructor(
    private service: ServiceService,
    private Router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getSolutionByPages();
    console.log("hello");
    
  }
  getSolutionByPages() {
    this.service
      .getServicesByPage(this.pageNo, this.pageSize)
      .subscribe((data) => {
        this.servicesArray = data.result;
      });
  }
  deleteServices(id: string) {
    environment
      .fireConfirmSwal('Are you sure You Want to Delete this Service?')
      .then((result) => {
        if (result.isConfirmed) {
          this.sharedService.deleteItem('serviceType', id).subscribe(
            (response) => {
              if (response.isSuccess) {
                environment.fireSuccessSwal(response.message);
                this.getSolutionByPages();
              } else {
                environment.fireErrorSwal(response.message);
              }
            },
            (errRes) => {
              if (
                errRes.error.statusCode === HttpStatusCode.NotFound ||
                errRes.error.statusCode === HttpStatusCode.BadRequest ||
                errRes.error.statusCode === HttpStatusCode.Conflict ||
                errRes.error.statusCode === HttpStatusCode.InternalServerError
              )
                environment.fireErrorSwal(errRes.error.message);
            }
          );
        }
      });
  }

  fetchPageWize(e: any) {
    this.pageNo = Number(e.target.dataset.customAttribute);
    this.getSolutionByPages();
    this.toggleActiveClass();
  }

  nextPreviousPageToggler(e: any): void {
    if (e.target.id === 'next') {
      this.pageNo++;
    } else {
      this.pageNo--;
      this.pageNo < 1 ? (this.pageNo = 1) : this.pageNo;
    }
    this.getSolutionByPages();
    this.toggleActiveClass();
  }

  toggleActiveClass() {
    document.querySelector('.activePage')?.classList.remove('activePage');
    this.pages
      .toArray()
      [this.pageNo - 1]?.nativeElement.classList.add('activePage');
  }
}
