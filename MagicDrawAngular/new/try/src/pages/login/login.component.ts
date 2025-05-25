import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { Router, ActivatedRoute } from "@angular/router"
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { CommonModule } from "@angular/common"
import { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup|undefined
  isLoading = false
  hidePassword = true
  returnUrl: string|undefined

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    })

    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/"
  }

  onSubmit(): void {
    if (this.loginForm?.invalid) {
      return
    }

    this.isLoading = true
    const { email, password } = this.loginForm?.value

    this.authService.login(email, password).subscribe(
      (user) => {
        if (user) {
          this.router.navigate([this.returnUrl])
        } else {
          this.snackBar.open("Invalid email or password", "Close", { duration: 3000 })
          this.isLoading = false
        }
      },
      (error) => {
        console.error("Login error:", error)
        this.snackBar.open("Login failed. Please try again.", "Close", { duration: 3000 })
        this.isLoading = false
      },
    )
  }
}
