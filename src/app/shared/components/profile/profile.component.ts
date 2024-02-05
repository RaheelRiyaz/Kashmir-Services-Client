import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Gender } from 'src/app/Enums/gender';
import { AddressResponse } from 'src/app/Models/addressResponse';
import { ProfileUpdateRequest } from 'src/app/Models/profile';
import { userResponse } from 'src/app/Models/user';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userProfile!: userResponse;
  updateProfile: ProfileUpdateRequest = new ProfileUpdateRequest();
  Id!: string;
  address!: AddressResponse;
  profileImg!: File;
  baseUrl = environment.baseUrl;
  addresses: AddressResponse[] = [];

  constructor(private sharedServices: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.sharedServices.getUserData().subscribe((response) => {
      if (response.isSuccess) {
        this.userProfile = response.result;
        console.log(response.result);
      }
    });
    let token = this.sharedServices.getToken();
    let helper = new JwtHelperService().decodeToken(token);
    this.updateProfile.Id = helper.UserId as string;
    this.Id = helper.UserId;

    // this.AddressService.getAddressById(this.Id).subscribe(response=>{
    //   if(response.isSuccess){
    //     environment.fireSuccessSwal(response.message);
    //     console.log(response.result)
    //   }
    // })

    this.sharedServices.getUserAddress(this.Id).subscribe({
      next: (response) => {
        this.addresses = response.result;
      },
      error: (err) => {
        // environment.fireErrorSwal(err.message)
      },
    });
  }
  presentData() {
    this.updateProfile.FullName = this.userProfile.fullName;
    this.updateProfile.Email = this.userProfile.email;
    this.updateProfile.PhoneNumber = this.userProfile.phoneNumber;
    if (this.userProfile.gender == 'Male') {
      this.updateProfile.Gender = Gender.Male;
    } else if (this.userProfile.gender == 'female') {
      this.updateProfile.Gender = Gender.Female;
    }
    console.log(this.Id);
  }
  profilePic(event: any) {
    let files: FileList = event.target.files;
    let file = files[0];
    this.profileImg = file;
    console.log(file);
  }

  updateProfileData(event: any) {
    let myForm = event.target as HTMLFormElement;
    let UpdateForm = new FormData(myForm);
    // UpdateForm.append('File', this.profileImg);
    UpdateForm.append('Id', this.Id);

    this.sharedServices.updateProfile(UpdateForm).subscribe({
      next: (response) => {
        environment.fireSuccessSwal(response.message);
        // this.router.navigate(['admin/'])
        // location.reload();
      },
      error: (err) => {
        environment.fireErrorSwal(err.message);
      },
    });
  }
}
