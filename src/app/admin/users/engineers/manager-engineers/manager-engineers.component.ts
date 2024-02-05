import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EngineerResponse } from 'src/app/Models/engineer-response';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-manager-engineers',
  templateUrl: './manager-engineers.component.html',
  styleUrls: ['./manager-engineers.component.css']
})
export class ManagerEngineersComponent implements OnInit {
  id!:string;
  constructor(private service: UsersService, private activedRoute:ActivatedRoute) {}
  engineers: EngineerResponse[]=[];
  ngOnInit(): void {
    this.activedRoute.params.subscribe((searchParam) => {
      this.id = searchParam['id'];
    });
    this. getManagerEngineers();
  }

  getManagerEngineers(){
    this.service.getManagerEngineers(this.id).subscribe({
      next: (response) => {
        this.engineers = response.result;
      },
    });
  }


  filterUsers(e: any): void {
    this.service.filterUser(e.target.value, 'engineers').subscribe({
      // next: (response) => {
      //   this.users = response.result;
      // },
      // error: (err) => {
      //   console.log(err);
      // },
    });
  }







}
