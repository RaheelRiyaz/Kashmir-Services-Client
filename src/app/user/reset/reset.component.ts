import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Forget } from 'src/app/Models/forget';
import { AccountService } from 'src/app/services/account.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  emailModel:Forget=new Forget();
  constructor(private service:AccountService,private Router:Router) { }

  ngOnInit(): void {
  }

  sendMail(){
  this.service.sendEmail(this.emailModel).subscribe(response=>{
    if(response.isSuccess){
        environment.fireSuccessSwal(response.message)
    }
  }, error=>{
    environment.fireErrorSwal(error.error.message)
  })
  }

}
