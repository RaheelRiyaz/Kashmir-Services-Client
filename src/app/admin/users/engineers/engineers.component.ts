import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EngineerResponse } from 'src/app/Models/engineer-response';
import { User } from 'src/app/Models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-engineers',
  templateUrl: './engineers.component.html',
  styleUrls: ['./engineers.component.css']
})
export class EngineersComponent implements OnInit {
  id!:string;
  constructor(private service: UsersService, private activedRoute:ActivatedRoute) {}
  users: User[]=[];
  ngOnInit(): void {
    this.activedRoute.params.subscribe((searchParam) => {
      this.id = searchParam['id'];
    });
    this. getEngineers();

  }

  getEngineers(){
    this.service.getUsers('engineers').subscribe({
      next: (response) => {
        this.users = response.result;
      },
    });
  }


  filterUsers(e: any): void {
    this.service.filterUser(e.target.value, 'engineers').subscribe({
      next: (response) => {
        this.users = response.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }




  // engineers: EngineerResponse[]=[];
  // ngOnInit(): void {
  //   this.service.getAllEngineers().subscribe({
  //     next: (response) => {
  //       this.engineers = response.result;
  //     },
  //   });
  // }



}
