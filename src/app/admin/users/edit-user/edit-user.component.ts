import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  constructor(
    private service: UsersService,
    private activatedRoute: ActivatedRoute
  ) {}
  id!: string;
  @ViewChild('profilePicture') profilePicture!: ElementRef<HTMLImageElement>;
  user: User = new User();
  baseFilePath: string = environment.baseUrl;
  file!: File;
  errorMessage: string = '';
  isFileExtensionValid: boolean = true;
  private readonly extensions = [
    'image/jpeg',
    'image/jpg',
    'image/img',
    'image/png',
  ];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => (this.id = response['id']),
    });
    this.service.getUserById(this.id).subscribe({
      next: (response) => {
        this.user = response.result;
        this.user.gender =
          this.user.gender === 'Male'
            ? '1'
            : this.user.gender === 'Female'
            ? '2'
            : '';
      },
    });
  }
  getImg(event: any) {
    if (this.extensions.includes(event.target.files[0].type)) {
      this.profilePicture.nativeElement.src = URL.createObjectURL(
        event.target.files[0]
      );
      this.isFileExtensionValid = !this.isFileExtensionValid;
      this.errorMessage = '';
    } else {
      this.isFileExtensionValid = false;
      this.profilePicture.nativeElement.src = '';
      this.errorMessage = '* Only image format allowed *';
    }
  }
  saveChanges(e: any): void {
    const formData = new FormData(e.target);
    formData.append('id', this.id);
    this.service.updateUser(formData).subscribe({
      next: (response) => {
        console.log(response);

        if (response.isSuccess) {
          environment.fireSuccessSwal(response.message);
        } else {
          environment.fireErrorSwal(response.message);
        }
      },
      error: (err) => {
        environment.fireErrorSwal(err.error.message);
      },
    });
  }
}
