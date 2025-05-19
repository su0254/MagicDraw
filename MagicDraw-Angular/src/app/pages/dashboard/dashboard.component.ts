import { Component, type OnInit } from "@angular/core"
import type { StatisticsService } from "../../services/statistics.service"
import type { StatisticsSummary } from "../../models/statistics.model"

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  dashboardStats: StatisticsSummary | null = null

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.loadDashboardStats()
  }

  loadDashboardStats(): void {
    this.statisticsService.getStatisticsSummary().subscribe(
      (stats) => {
        this.dashboardStats = stats
      },
      (error) => {
        console.error("Error loading dashboard statistics:", error)
      },
    )
  }
}
