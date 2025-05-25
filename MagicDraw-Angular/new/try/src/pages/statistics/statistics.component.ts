import { Component, OnInit } from "@angular/core"
import { MatTabChangeEvent, MatTabsModule } from "@angular/material/tabs"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatSelectModule } from "@angular/material/select"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { CommonModule } from "@angular/common"
import { StatisticsService } from "../../services/statistics.service"
import { StatisticsSummary } from "../../models/statistics.model"
import { StatCardComponent } from "../../components/stat-card/stat-card.component"

@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    StatCardComponent,
  ],
})
export class StatisticsComponent implements OnInit {
  statisticsSummary: StatisticsSummary | null = null
  selectedTimeRange = "month"
  loadingCharts = true
  loadingTabContent = true

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.loadStatisticsSummary()
    this.loadChartData()
  }

  loadStatisticsSummary(): void {
    this.statisticsService.getStatisticsSummary().subscribe(
      (summary) => {
        this.statisticsSummary = summary
      },
      (error) => {
        console.error("Error loading statistics summary:", error)
      },
    )
  }

  loadChartData(): void {
    this.loadingCharts = true
    // In a real app, this would fetch chart data from the API
    setTimeout(() => {
      this.loadingCharts = false
    }, 1000)
  }

  onTimeRangeChange(): void {
    this.loadingCharts = true
    // In a real app, this would fetch new data based on the selected time range
    setTimeout(() => {
      this.loadingCharts = false
    }, 1000)
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.loadingTabContent = true
    // In a real app, this would fetch data for the selected tab
    setTimeout(() => {
      this.loadingTabContent = false
    }, 800)
  }
}
