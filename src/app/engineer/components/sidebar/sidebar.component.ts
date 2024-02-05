import { Component, OnInit } from '@angular/core';
import { LoggedInCredentials } from 'src/app/Models/loggedInCredentials';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  baseUrl: string = environment.baseUrl;
  localObj: LoggedInCredentials | null = new LoggedInCredentials();
  constructor(public sharedService: SharedService) {}

  ngOnInit(): void {
    this.localObj = this.sharedService.getLocalObject();
  }

}
