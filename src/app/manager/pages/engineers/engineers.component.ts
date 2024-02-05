import { Component, OnInit } from '@angular/core';
import { Engineer } from 'src/app/Models/user';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-engineers',
  templateUrl: './engineers.component.html',
  styleUrls: ['./engineers.component.css'],
})
export class EngineersComponent implements OnInit {
  constructor(private service: BaseService) {}
  engineers: Engineer[] = [];
  ngOnInit(): void {
    this.service.Fetch<any>('manager/all-engineers/managerId').subscribe({
      next: (response) => {
        this.engineers = response.result;
        console.log(response);
      },
    });
  }
}
