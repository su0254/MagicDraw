import { Component, Inject,  OnInit } from "@angular/core"
import {  FormBuilder,  FormGroup, Validators } from "@angular/forms"
import { MAT_DIALOG_DATA,  MatDialogRef } from "@angular/material/dialog"

@Component({
  selector: "app-drawing-dialog",
  templateUrl: "./drawing-dialog.component.html",
  styleUrls: ["./drawing-dialog.component.css"],
})
export class DrawingDialogComponent implements OnInit {
  drawingForm!: FormGroup
  categories = ["Animals", "Nature", "Fantasy", "Space", "Vehicles", "People"]
  statuses = ["Approved", "Pending", "Rejected"];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DrawingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.drawingForm = this.fb.group({
      title: [this.data.drawing.title || "", [Validators.required]],
      category: [this.data.drawing.category || "", [Validators.required]],
      artist: [this.data.drawing.artist || "", [Validators.required]],
      status: [this.data.drawing.status || "Pending", this.data.drawing.id ? [Validators.required] : []],
    })

    // Add file upload control for new drawings
    if (!this.data.drawing.id) {
      this.drawingForm.addControl("file", this.fb.control("", [Validators.required]))
    }
  }

  onCancel(): void {
    this.dialogRef.close()
  }

  onSubmit(): void {
    if (this.drawingForm.valid) {
      this.dialogRef.close(this.drawingForm.value)
    }
  }
}
