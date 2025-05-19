import { Component, type OnInit } from "@angular/core"
import type { MatTabChangeEvent } from "@angular/material/tabs"
import type { StatisticsService } from "../../services/statistics.service"
import type { StatisticsSummary } from "../../models/statistics.model"

@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.scss"],
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
