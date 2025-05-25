import { Component, OnInit } from "@angular/core"
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from "@angular/forms"
import { MatDialogRef, MatDialogModule } from "@angular/material/dialog"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-add-category-dialog",
  templateUrl: "./add-category-dialog.component.html",
  styleUrls: ["./add-category-dialog.component.scss"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class AddCategoryDialogComponent implements OnInit {
  categoryForm: FormGroup | undefined

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCategoryDialogComponent>,
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ["", Validators.required],
      description: [""],
    })
  }

  onSubmit(): void {
    if (this.categoryForm?.valid) {
      this.dialogRef.close(this.categoryForm.value)
    }
  }
}
