import { Component } from "@angular/core"

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
})
export class ConfirmDialogComponent {
  data: ConfirmDialogData

  constructor(public data: ConfirmDialogData) {
    // Constructor logic here
  }
}
