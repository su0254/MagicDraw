import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { ReactiveFormsModule } from "@angular/forms"
import { DrawingService } from '../../../../services/drawingService/drawing.service';
import { MatDialogModule } from '@angular/material/dialog'; // ייבוא MatDialogModule
import { CategoryService } from '../../../../services/categoryService/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../../../Models/Category';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-drawing-dialog',
  imports: [MatLabel, MatError, MatSelect, AsyncPipe,
    MatOption, ReactiveFormsModule, MatDialogModule],
  templateUrl: './drawing-dialog.component.html',
  styleUrls: ['./drawing-dialog.component.css']
})
export class DrawingDialogComponent {

  drawingForm!: FormGroup;
  newForm: any = new FormGroup({});
  categories$: Observable<Category[]> | undefined;
  categories: string[] | undefined;
  statuses = ["Approved", "Pending", "Rejected"];

  constructor(
    private drawingService: DrawingService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<DrawingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  
  ngOnInit() {
    this.categoryService.getAllCategories();
    this.categories$ = this.categoryService.categories$;
    this.categories$.subscribe((categories) => {
      this.categories = categories.map((category) => category.categoryName);
    });
    console.log("categories$", this.categories$);
    
    this.drawingForm = this.fb.group({
      fileName: [this.data.drawing.title || "", [Validators.required]],
      categoryName: [this.data.drawing.categoryName || "", [Validators.required]],
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
      
      this.newForm = this.fb.group({
        // userId: [this.data.drawing.userId],
        categoryName: [this.drawingForm.value.categoryName.categoryName],
        fileName: [this.drawingForm.value.fileName],
        imageFile: [this.drawingForm.value.imageFile],
      })

      this.newForm.patchValue({
        // userId: this.data.drawing.userId,
        categoryName: this.drawingForm.value.categoryName.categoryName,
        fileName: this.drawingForm.value.fileName,
        imageFile: this.drawingForm.value.imageFile,
      })
      console.log("newForm", this.newForm.value);
      this.drawingService.addDrawing(this.newForm.value).subscribe()
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
