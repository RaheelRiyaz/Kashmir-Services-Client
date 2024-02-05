import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobRole } from 'src/app/Models/jobRole';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-job-roles',
  templateUrl: './job-roles.component.html',
  styleUrls: ['./job-roles.component.css']
})
export class JobRolesComponent implements OnInit {
  id!:string;
  constructor(private service: BaseService, private activedRoute:ActivatedRoute) {}
  roles: JobRole[] = [];
  ngOnInit(): void {
    this.activedRoute.params.subscribe((searchParam) => {
      this.id = searchParam['id'];
      console.log(this.id)
    });
    this.service.Fetch<JobRole[]>('engineer/my-jobroles?engId='+this.id).subscribe({
      next: (response) => {
        this.roles=response.result;
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
