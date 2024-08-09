import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.signin(email, password).subscribe({
      next: (data: any) => {
        this.storageService.saveUser(data);

        this.isLoggedIn = true;
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }
}
