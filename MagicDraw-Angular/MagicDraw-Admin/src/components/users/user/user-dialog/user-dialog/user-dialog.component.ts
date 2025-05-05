import { Component, Inject,  OnInit } from "@angular/core"
import { FormBuilder,  FormGroup, Validators } from "@angular/forms"
import { MAT_DIALOG_DATA,  MatDialogRef } from "@angular/material/dialog"
import { CommonModule } from "@angular/common"
import { MatFormField } from "@angular/material/form-field"
import { MatLabel } from "@angular/material/form-field"
import { MatInput } from "@angular/material/input"
import { MatButton } from "@angular/material/button"
import { MatDialogModule } from "@angular/material/dialog"
import { MatError } from "@angular/material/form-field"
import { ReactiveFormsModule } from "@angular/forms"
import { UserService } from "../../../../../services/userManagment/user.service"

@Component({
  selector: "app-user-dialog",
  imports: [
    CommonModule,  MatFormField, MatLabel, MatInput, MatButton,
     MatDialogModule, MatError, ReactiveFormsModule],
  templateUrl: "./user-dialog.component.html",
  styleUrls: ["./user-dialog.component.css"],
})
export class UserDialogComponent implements OnInit {
  userForm!: FormGroup
  roles = ["Admin", "Moderator", "User"];

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: [this.data.user.firstName || "", [Validators.required, Validators.minLength(2)]],
      lastName: [this.data.user.lastName || "", [Validators.required, Validators.minLength(2)]],
      email: [this.data.user.email || "", [Validators.required, Validators.email]],
      password: [this.data.user.password || "", [Validators.required, Validators.minLength(6)]],
    })

    // // Add password field for new users
    // if (!this.data.user.id) {
    //   this.userForm.addControl("password", this.fb.control("", [Validators.required, Validators.minLength(6)]))
    // }
  }

  onCancel(): void {
    this.dialogRef.close()
  }

  onSubmit(): void {
    console.log(this.userForm.value);
    if (this.userForm.valid) {
      console.log("Form Submitted!", this.userForm.value);
      
      this.userService.addUser(this.userForm.value)
      this.dialogRef.close(this.userForm.value)
    }
  }
}
