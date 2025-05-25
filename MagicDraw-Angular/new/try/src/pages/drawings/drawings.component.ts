import { Component, OnInit } from "@angular/core"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatChipsModule } from "@angular/material/chips"
import { MatButtonToggleModule } from "@angular/material/button-toggle"
import { MatMenuModule } from "@angular/material/menu"
import { MatDividerModule } from "@angular/material/divider"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatTooltipModule } from "@angular/material/tooltip"
import { MatTableModule } from "@angular/material/table"
import { FormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { DrawingService } from "../../services/drawing.service"
import { Drawing } from "../../models/drawing.model"
import { MatChipListbox } from "@angular/material/chips"

@Component({
  selector: "app-drawings",
  templateUrl: "./drawings.component.html",
  styleUrls: ["./drawings.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatTableModule,
    MatChipListbox
  ],
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
        drawing.user?.toLowerCase().includes(this.searchTerm.toLowerCase())

      const matchesCategory = this.categoryFilter === "all" || drawing.category === this.categoryFilter
      const matchesStatus = this.statusFilter === "all" || drawing.status === this.statusFilter

      return matchesSearch && matchesCategory && matchesStatus
    })
  }
}
