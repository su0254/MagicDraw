import { Component, type OnInit } from "@angular/core"
import type { CategoryService } from "../../services/category.service"
import type { Category } from "../../models/category.model"

@Component({
  selector: "app-popular-categories",
  templateUrl: "./popular-categories.component.html",
  styleUrls: ["./popular-categories.component.scss"],
})
export class PopularCategoriesComponent implements OnInit {
  categories: Category[] = []
  loading = true
  timeframe = "week"

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories()
  }

  loadCategories(): void {
    this.loading = true
    this.categoryService.getPopularCategories(5).subscribe(
      (categories) => {
        this.categories = categories
        this.loading = false
      },
      (error) => {
        console.error("Error loading popular categories:", error)
        this.loading = false
      },
    )
  }

  changeTimeframe(timeframe: string): void {
    this.timeframe = timeframe
    // In a real app, this would fetch new data based on the timeframe
    // For now, we'll simulate loading
    this.loading = true
    setTimeout(() => {
      // Simulate different data for different timeframes
      if (timeframe === "month") {
        this.categories = this.categories
          .map((c) => ({
            ...c,
            percentage: Math.floor(Math.random() * 30) + 10,
          }))
          .sort((a, b) => b.percentage - a.percentage)
      } else if (timeframe === "year") {
        this.categories = this.categories
          .map((c) => ({
            ...c,
            percentage: Math.floor(Math.random() * 40) + 5,
          }))
          .sort((a, b) => b.percentage - a.percentage)
      }
      this.loading = false
    }, 500)
  }
}
