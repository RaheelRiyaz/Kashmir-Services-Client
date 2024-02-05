import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  length: number = 0;

  constructor(private service: ServiceService, private Router: Router) {}

  ngOnInit(): void {
    this.service.getServices().subscribe((data) => {
      this.length = data.result.length;
    });
  }

  getServices() {
    this.Router.navigate(['/admin/services']);
  }
}
