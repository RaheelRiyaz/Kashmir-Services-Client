import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TestimonialResponse } from 'src/app/Models/testimonial';
import { BaseService } from 'src/app/services/base.service';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
  testimonials:TestimonialResponse[]=[]
  constructor(private service:BaseService, private sharedService:SharedService) { }

  ngOnInit(): void {
    this.getAllTestimonials();
  }
  getAllTestimonials() {
    this.service
      .Fetch<TestimonialResponse[]>(
        'testimonial/my-testimonials'
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
  postTestimonial(desc:string){
    let model={
      description:desc
    }
   this.service.Post(model,"testimonial").subscribe({
    next:(response)=>{
      environment.fireSuccessSwal(response.message);
      this.getAllTestimonials();
    },
    error:(err)=>{

    }
   })
  }
}
