import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { MatSnackBar } from "@angular/material/snack-bar"
import { AuthService } from "../../../services/auth.service"
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from "@angular/material/form-field"
import { MatLabel } from "@angular/material/form-field"
import { MatError } from "@angular/material/form-field"
import { MatSpinner } from "@angular/material/progress-spinner"

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  imports: [MatCardModule, MatIconModule, ReactiveFormsModule, 
    MatFormField, MatLabel, MatError, MatSpinner],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  isLoading = false
  hidePassword = true

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["admin@example.com", [Validators.required, Validators.email]],
      password: ["password", [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return
    }

    this.isLoading = true
    const { email, password } = this.loginForm.value

    this.authService.login({email, password})
      
  }
}
