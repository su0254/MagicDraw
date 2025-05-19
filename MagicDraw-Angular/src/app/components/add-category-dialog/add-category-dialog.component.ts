import { Component, type OnInit } from "@angular/core"
import { type FormBuilder, type FormGroup, Validators } from "@angular/forms"
import type { MatDialogRef } from "@angular/material/dialog"

@Component({
  selector: "app-add-category-dialog",
  templateUrl: "./add-category-dialog.component.html",
  styleUrls: ["./add-category-dialog.component.scss"],
})
export class AddCategoryDialogComponent implements OnInit {
  categoryForm: FormGroup

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
    if (this.categoryForm.valid) {
      this.dialogRef.close(this.categoryForm.value)
    }
  }
}
