import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  hide = true;

  login() {
    if (this.validateLogin()) {
      this.authService.login(this.loginData.value.username, this.loginData.value.password)
        .then(isAuthenticated => {
          if (isAuthenticated) {
            this.router.navigate(['/car']);
          } else {
            this.loginData.setErrors({ invalidLogin: true });
          }
        })
        .catch(error => {
          // Handle or display error
          console.error('Login failed:', error);
        });
    }
    else {
      this.loginData.setErrors({invalidLogin: true});
    }
  }

  getErrors() {
    if (this.loginData.hasError('invalidLogin')) {
      return "Invalid username or password. Please try again.";
    }
    else {
      return '';
    }
  }

  validateLogin() {
    // Used to display error messages
    this.loginData.markAllAsTouched();
    return this.loginData.valid;
  }

  constructor(private router: Router, private authService: AuthService) { }
}
