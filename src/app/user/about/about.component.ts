import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddContact } from 'src/app/Models/add-contact';
import { AccountService } from 'src/app/services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  contactModel:AddContact=new AddContact();

  constructor(private Router:Router,private service:AccountService) { }

  ngOnInit(): void {
  }

  submitQuery(){
    this.service.addContact(this.contactModel).subscribe(response=>{
      console.log(response)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Thanks for Contacting Us.We Will Get Back to you Soon!!',
        showConfirmButton: false,
        timer: 3000
      })
  },err=>{
    console.error(err)
  })
   
    setTimeout(()=>{
      this.Router.navigate(['/home'])
    },3000)
  }

}
