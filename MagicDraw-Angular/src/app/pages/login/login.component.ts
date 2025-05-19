import { Component, type OnInit } from "@angular/core"
import { type FormBuilder, type FormGroup, Validators } from "@angular/forms"
import type { Router, ActivatedRoute } from "@angular/router"
import type { MatSnackBar } from "@angular/material/snack-bar"
import type { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  isLoading = false
  hidePassword = true
  returnUrl: string

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
    if (this.loginForm.invalid) {
      return
    }

    this.isLoading = true
    const { email, password } = this.loginForm.value

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
