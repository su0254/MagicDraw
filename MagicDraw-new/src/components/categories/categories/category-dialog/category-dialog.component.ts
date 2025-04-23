import { Component, Inject,  OnInit } from "@angular/core"
import {  FormBuilder,  FormGroup, Validators } from "@angular/forms"
import { MAT_DIALOG_DATA,  MatDialogRef } from "@angular/material/dialog"
import { MatDialogActions } from "@angular/material/dialog"
import { MatDialogContent } from "@angular/material/dialog"
import { MatIcon } from "@angular/material/icon"
import { MatFormField } from "@angular/material/form-field"
import { MatLabel } from "@angular/material/form-field"
import { MatInput } from "@angular/material/input"
import { MatSelect } from "@angular/material/select"
import { MatError } from "@angular/material/form-field"
import { MatSelectTrigger } from "@angular/material/select"
import { MatOption } from "@angular/material/select"
import { ReactiveFormsModule } from "@angular/forms"

@Component({
  selector: "app-category-dialog",
  imports: [MatIcon, MatFormField, MatLabel, MatInput, MatSelect,
     MatDialogActions, MatDialogContent, MatError, MatSelectTrigger, MatOption
    , ReactiveFormsModule],
  templateUrl: "./category-dialog.component.html",
  styleUrls: ["./category-dialog.component.css"],
})
export class CategoryDialogComponent implements OnInit {
  categoryForm!: FormGroup

  icons = [
    { name: "pets", label: "Pets" },
    { name: "eco", label: "Nature" },
    { name: "auto_awesome", label: "Fantasy" },
    { name: "rocket", label: "Space" },
    { name: "directions_car", label: "Vehicles" },
    { name: "people", label: "People" },
    { name: "apartment", label: "Buildings" },
    { name: "restaurant", label: "Food" },
    { name: "sports_soccer", label: "Sports" },
    { name: "music_note", label: "Music" },
    { name: "school", label: "Education" },
    { name: "local_florist", label: "Flowers" },
  ]

  colors = [
    { value: "#f44336", name: "Red" },
    { value: "#e91e63", name: "Pink" },
    { value: "#9c27b0", name: "Purple" },
    { value: "#673ab7", name: "Deep Purple" },
    { value: "#3f51b5", name: "Indigo" },
    { value: "#2196f3", name: "Blue" },
    { value: "#03a9f4", name: "Light Blue" },
    { value: "#00bcd4", name: "Cyan" },
    { value: "#009688", name: "Teal" },
    { value: "#4caf50", name: "Green" },
    { value: "#8bc34a", name: "Light Green" },
    { value: "#cddc39", name: "Lime" },
    { value: "#ffeb3b", name: "Yellow" },
    { value: "#ffc107", name: "Amber" },
    { value: "#ff9800", name: "Orange" },
    { value: "#ff5722", name: "Deep Orange" },
    { value: "#795548", name: "Brown" },
    { value: "#607d8b", name: "Blue Grey" },
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      name: [this.data.category.name || "", [Validators.required]],
      description: [this.data.category.description || "", [Validators.required]],
      iconName: [this.data.category.iconName || "eco", [Validators.required]],
      color: [this.data.category.color || "#4caf50", [Validators.required]],
    })
  }

  onCancel(): void {
    this.dialogRef.close()
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.dialogRef.close(this.categoryForm.value)
    }
  }
}
