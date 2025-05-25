import { Component, OnInit } from "@angular/core"
import { MatCardModule } from "@angular/material/card"
import { MatChipsModule } from "@angular/material/chips"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatMenuModule } from "@angular/material/menu"
import { MatDividerModule } from "@angular/material/divider"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { CommonModule } from "@angular/common"
import { DrawingService } from "../../services/drawing.service"
import { Drawing } from "../../models/drawing.model"

@Component({
  selector: "app-recent-drawings",
  templateUrl: "./recent-drawings.component.html",
  styleUrls: ["./recent-drawings.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
})
export class RecentDrawingsComponent implements OnInit {
  recentDrawings: Drawing[] = []
  loading = true

  constructor(private drawingService: DrawingService) {}

  ngOnInit(): void {
    this.loadRecentDrawings()
  }

  loadRecentDrawings(): void {
    this.loading = true
    this.drawingService.getRecentDrawings(4).subscribe(
      (drawings) => {
        this.recentDrawings = drawings
        this.loading = false
      },
      (error) => {
        console.error("Error loading recent drawings:", error)
        this.loading = false
      },
    )
  }

  getUserInitials(name: string): string {
    if (!name) return ""
    const parts = name.split(" ")
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[1].charAt(0)}`
    }
    return parts[0].charAt(0)
  }

  likeDrawing(id: string): void {
    // In a real app, this would call an API to like the drawing
    this.recentDrawings = this.recentDrawings.map((drawing) => {
      if (drawing.id === id) {
        return { ...drawing, likes: drawing.likes + 1 }
      }
      return drawing
    })
  }
}
