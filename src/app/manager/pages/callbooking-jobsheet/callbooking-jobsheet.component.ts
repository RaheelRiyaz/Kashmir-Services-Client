import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobSheet } from 'src/app/Models/jobSheet';
import { User } from 'src/app/Models/user';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-callbooking-jobsheet',
  templateUrl: './callbooking-jobsheet.component.html',
  styleUrls: ['./callbooking-jobsheet.component.css']
})
export class CallbookingJobsheetComponent implements OnInit {

  customerDetails:User=new User();
  id!:string
  constructor(private service: BaseService, private activatedRoute : ActivatedRoute) {}
  jobsheets: JobSheet[] = [];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((searchParam) => {
      this.id = searchParam['id'];
    });
    this.getjobsheet();
  }
  getjobsheet(): void {
    this.service.Fetch<JobSheet[]>('manager/engineers-jobsheet/'+this.id).subscribe({
      next: (response) => {
        this.jobsheets = response.result;
        console.log(response);
      },
    });
  }

  getCustomerDetails(id: any): void {
    this.service.Find<User>('users/' + id).subscribe({
      next: (response) => {
        this.customerDetails=response.result;
        console.log(this.customerDetails)
        console.log(response)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

 

}