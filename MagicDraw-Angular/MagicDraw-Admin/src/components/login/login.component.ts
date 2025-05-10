import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/LoginService/auth.service';


@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,
    ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private userService: LoginService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login(e: Event) {
    e.preventDefault();
    if (this.form.valid) {
      this.userService.login({
        user: {
          email: this.form.get('email')?.value,
          password: this.form.get('password')?.value,
          id:'',
          firstName: '',
          lastName: ''
        }
      })
      console.log("before navigate");

    }
    else {
      let errorMessage = '';

      if (this.form.get('email')?.hasError('required')) {
        errorMessage += 'Email is required.\n';
      }
      if (this.form.get('email')?.hasError('email')) {
        errorMessage += 'Please enter a valid email address.\n';
      }
      if (this.form.get('password')?.hasError('required')) {
        errorMessage += 'Password is required.\n';
      }

      alert(errorMessage || 'Form is invalid. Please fill in all required fields.');
    }
  }
}
