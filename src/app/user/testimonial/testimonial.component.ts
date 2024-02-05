import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TestimonialResponse } from 'src/app/Models/testimonial';
import { BaseService } from 'src/app/services/base.service';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css'],
})
export class TestimonialComponent implements OnInit {
  imageBasePath = environment.baseUrl;
  testimonials: TestimonialResponse[] = [];
  index: number = 0;
  constructor(
    private service: BaseService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getAllTestimonials();
  }
  getAllTestimonials() {
    this.service
      .Fetch<TestimonialResponse[]>('testimonial/all-active-testimonials')
      .subscribe({
        next: (response) => {
          console.log(response);
          this.testimonials = response.result;
        },
      });
  }
}
