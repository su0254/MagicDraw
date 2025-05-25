import { Component, Inject } from "@angular/core"
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from "@angular/material/dialog"
import { MatDialogActions } from "@angular/material/dialog"

export interface ConfirmDialogData {
  title: string
  message: string
  confirmButtonText?: string
  confirmButtonColor?: "primary" | "accent" | "warn"
}

@Component({
  selector: "app-confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.scss"],
  standalone: true,
  imports: [MatDialogContent, MatDialogActions],
})
export class ConfirmDialogComponent {
  data: ConfirmDialogData

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData: ConfirmDialogData,
  ) {
    this.data = dialogData
  }
}
