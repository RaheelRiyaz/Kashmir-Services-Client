import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private service: UsersService) {}
  @Input('user') user!: string;
  users: User[]=[];
  ngOnInit(): void {
    this.service.getUsers(this.user).subscribe({
      next: (response) => {
        this.users = response.result;
      },
    });
  }

  filterUsers(e: any): void {
    this.service.filterUser(e.target.value, this.user).subscribe({
      next: (response) => {
        this.users = response.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
