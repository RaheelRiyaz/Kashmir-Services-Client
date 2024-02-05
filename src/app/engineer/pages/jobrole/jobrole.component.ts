import { Component, OnInit } from '@angular/core';
import { JobRole } from 'src/app/Models/jobRole';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-jobrole',
  templateUrl: './jobrole.component.html',
  styleUrls: ['./jobrole.component.css'],
})
export class JobroleComponent implements OnInit {
  constructor(private service: BaseService) {}
  roles: JobRole[] = [];
  ngOnInit(): void {
    this.service.Fetch<JobRole[]>('engineer/my-jobroles').subscribe({
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
