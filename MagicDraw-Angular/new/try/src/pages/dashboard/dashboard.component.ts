import { Component, OnInit } from "@angular/core"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatGridListModule } from "@angular/material/grid-list"
import { RouterModule } from "@angular/router"
import { CommonModule } from "@angular/common"
import { StatisticsService } from "../../services/statistics.service"
import { StatisticsSummary } from "../../models/statistics.model"
import { StatCardComponent } from "../../components/stat-card/stat-card.component"
import { RecentDrawingsComponent } from "../../components/recent-drawings/recent-drawings.component"
import { PopularCategoriesComponent } from "../../components/popular-categories/popular-categories.component"

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    StatCardComponent,
    RecentDrawingsComponent,
    PopularCategoriesComponent,
  ],
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
