import { Component, Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { ReactiveFormsModule } from "@angular/forms"
import { DrawingService } from '../../../../services/drawingService/drawing.service';
import { MatDialogModule } from '@angular/material/dialog'; // ייבוא MatDialogModule

@Component({
  selector: 'app-drawing-dialog',
  imports: [ MatLabel, MatError, MatSelect, 
    MatOption, ReactiveFormsModule,MatDialogModule],
  templateUrl: './drawing-dialog.component.html',
  styleUrls: ['./drawing-dialog.component.css']
})
export class DrawingDialogComponent {

  drawingForm!: FormGroup
  categories: string[] | undefined;
  statuses = ["Approved", "Pending", "Rejected"];

  constructor(
    private drawingService: DrawingService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DrawingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.categories= ["Nature", "Animals", "People", "Abstract", "Other"]
    this.drawingForm = this.fb.group({
      fileName: [this.data.drawing.title || "", [Validators.required]],
      categoryName: [this.data.drawing.category || "", [Validators.required]],
    })

    // Add file upload control for new drawings
    if (!this.data.drawing.id) {
      this.drawingForm.addControl("imageFile", this.fb.control("", [Validators.required]))
    }
  }

  onCancel(): void {
    this.dialogRef.close()
  }

  onSubmit(): void {
    if (this.drawingForm.valid) {
      console.log("drawing-dialog", this.drawingForm.value);
      
      this.drawingService.addDrawing(this.drawingForm.value).subscribe()
      this.dialogRef.close(this.drawingForm.value)
    }
  }

  onFileSelected($event: Event) {
    const input = $event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      const file = input.files[0]
      this.drawingForm.patchValue({
        imageFile: file
      })
    }
  }
}
