import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TestimonialResponse, UpdateTestimonialStatusRequest } from 'src/app/Models/testimonial';
import { BaseService } from 'src/app/services/base.service';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  imageBasePath=environment.baseUrl;
  testimonials:TestimonialResponse[]=[];
  updateTestimonialStatusRequest:UpdateTestimonialStatusRequest=new UpdateTestimonialStatusRequest();
  constructor(private service:BaseService, private sharedService:SharedService) { }

  ngOnInit(): void {
    this.getAllTestimonials();
  }
  getAllTestimonials() {
    this.service
      .Fetch<TestimonialResponse[]>(
        'testimonial/all'
      )
      .subscribe({
        next: (response) => {
          console.log(response);

          this.testimonials = response.result;
        },
      });
  }
  deleteTestimonial(id: string) {
    environment
      .fireConfirmSwal('Are you sure You Want to Delete this Testimonial?')
      .then((result) => {
        if (result.isConfirmed) {
          this.sharedService.deleteItem('Testimonial', id).subscribe(
            (response) => {
              if (response.isSuccess)
                environment.fireSuccessSwal(response.message);
              this.getAllTestimonials();
            },
            (errRes) => {
              if (
                errRes.error.statusCode === HttpStatusCode.NotFound ||
                errRes.error.statusCode === HttpStatusCode.BadRequest ||
                errRes.error.statusCode === HttpStatusCode.InternalServerError
              )
                environment.fireErrorSwal(errRes.error.message);
            }
          );
        }
      });
  }

  updateStatus(id:string,status:any){
    this.updateTestimonialStatusRequest.id=id;
    this.updateTestimonialStatusRequest.status=status
    console.log(this.updateTestimonialStatusRequest)

    environment
      .fireConfirmSwal('Are you sure You Want to active this Testimonial?')
      .then((result) => {
        if (result.isConfirmed) {
          this.service.Update<UpdateTestimonialStatusRequest,string>(
             this.updateTestimonialStatusRequest,'testimonial/status-changes'
          ) .subscribe({
            next: (response) => {
              environment.fireSuccessSwal(response.message);
              this.getAllTestimonials();
            },
          });
        }
      });
  }
}
