import { Component, type OnInit } from "@angular/core"
import type { DrawingService } from "../../services/drawing.service"
import type { Drawing } from "../../models/drawing.model"

@Component({
  selector: "app-recent-drawings",
  templateUrl: "./recent-drawings.component.html",
  styleUrls: ["./recent-drawings.component.scss"],
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
