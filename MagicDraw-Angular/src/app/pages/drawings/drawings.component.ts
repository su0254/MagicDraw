import { Component, type OnInit } from "@angular/core"
import type { DrawingService } from "../../services/drawing.service"
import type { Drawing } from "../../models/drawing.model"

@Component({
  selector: "app-drawings",
  templateUrl: "./drawings.component.html",
  styleUrls: ["./drawings.component.scss"],
})
export class DrawingsComponent implements OnInit {
  drawings: Drawing[] = []
  filteredDrawings: Drawing[] = []
  loading = true
  viewMode = "grid"
  searchTerm = ""
  categoryFilter = "all"
  statusFilter = "all"
  displayedColumns: string[] = ["drawing", "category", "status", "actions"]

  // This would come from the API in a real app
  categories: string[] = ["Ocean", "Space", "Animals", "Fantasy", "Vehicles"]

  constructor(private drawingService: DrawingService) {}

  ngOnInit(): void {
    this.loadDrawings()
  }

  loadDrawings(): void {
    this.loading = true
    this.drawingService.getDrawings().subscribe(
      (drawings) => {
        this.drawings = drawings
        this.applyFilters()
        this.loading = false
      },
      (error) => {
        console.error("Error loading drawings:", error)
        this.loading = false
      },
    )
  }

  applyFilters(): void {
    this.filteredDrawings = this.drawings.filter((drawing) => {
      const matchesSearch =
        drawing.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        drawing.user.toLowerCase().includes(this.searchTerm.toLowerCase())

      const matchesCategory = this.categoryFilter === "all" || drawing.category === this.categoryFilter
      const matchesStatus = this.statusFilter === "all" || drawing.status === this.statusFilter

      return matchesSearch && matchesCategory && matchesStatus
    })
  }
}
