import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPassword } from 'src/app/Models/reset-password';
import { AccountService } from 'src/app/services/account.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  key:string=''
 resetModel:ResetPassword=new ResetPassword();
  constructor(private service:AccountService,private activatedRoute:ActivatedRoute,private Router:Router) { }

  ngOnInit(): void {
  }
  resetPassword(){
    this.key = this.activatedRoute.snapshot.queryParams['token'];
    console.log(this.key)
    this.resetModel.token=this.key;
    this.service.resetPassword(this.resetModel).subscribe(response=>{
      if(response.isSuccess){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your Password has been Reset Successfully',
          showConfirmButton: false,
          timer: 3500
        })
        setTimeout(()=>{
          this.Router.navigate(['/login'])
        },2000)
      }
      else{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Link has been Expired,Try Again',
          showConfirmButton: false,
          timer: 3500
        })
        setTimeout(()=>{
          this.Router.navigate(['/reset'])
        },2000)
      }
    })
  }

}
