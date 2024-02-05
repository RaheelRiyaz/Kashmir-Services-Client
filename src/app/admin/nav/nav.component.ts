import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedInCredentials } from 'src/app/Models/loggedInCredentials';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  localObj:LoggedInCredentials|null=new LoggedInCredentials();
  constructor(private Router:Router,public sharedService:SharedService) { }
  ngOnInit(): void {
  this.localObj=this.sharedService.getLocalObject();
  }
}
