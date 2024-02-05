import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  private key: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: AccountService,
    private router: Router
  ) {}
  login() {
    this.router.navigate(['login']);
  }
  ngOnInit(): void {
    this.key = this.activatedRoute.snapshot.queryParams['token'];
    this.service.verifyEmail(this.key).subscribe((data) => {
      if (data.Message == 'Success') {
        Swal.fire({
          icon: 'success',
          title: 'Congrats...',
          text: 'Your Email has been Verified!',
          footer: '<a href="">You can now Login?</a>',
          timer: 3700,
        });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'hey...',
          text: 'Your Email has been Already Verified or Your Link has Expired',
          footer: '<a href="">check Your Email?</a>',
        });
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 3000);
      }
    });
  }
}
