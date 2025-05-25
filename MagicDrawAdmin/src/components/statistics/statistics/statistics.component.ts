import { Component, OnInit } from "@angular/core"
import { MatIcon } from "@angular/material/icon"
import { MatCard } from "@angular/material/card"
import { MatFormField } from "@angular/material/form-field"
import { MatLabel } from "@angular/material/form-field"
import { MatDateRangeInput } from "@angular/material/datepicker"
import { MatDatepickerToggle } from "@angular/material/datepicker"
import { MatDateRangePicker } from "@angular/material/datepicker"
import { MatCardContent } from "@angular/material/card"
import { MatCardHeader } from "@angular/material/card"
import { MatCardTitle } from "@angular/material/card"
import { CommonModule } from "@angular/common"

interface CategoryStat {
  name: string
  count: number
  percentage: number
  color: string
}

interface MonthlyData {
  month: string
  uploads: number
  views: number
}

interface UserStat {
  name: string
  uploads: number
  avatar: string
}

@Component({
  selector: "app-statistics",
  imports: [MatIcon, MatCard, MatFormField, MatLabel, MatDateRangeInput
    , MatDatepickerToggle, MatDateRangePicker, MatCardContent, MatCardHeader
  , MatCardTitle, CommonModule],
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.css"],
})
export class StatisticsComponent implements OnInit {
  // Category statistics
  categoryStats: CategoryStat[] = [
    { name: "Animals", count: 245, percentage: 25, color: "#f44336" },
    { name: "Nature", count: 189, percentage: 19, color: "#4caf50" },
    { name: "Fantasy", count: 156, percentage: 16, color: "#9c27b0" },
    { name: "Space", count: 98, percentage: 10, color: "#2196f3" },
    { name: "Vehicles", count: 87, percentage: 9, color: "#ff9800" },
    { name: "People", count: 132, percentage: 13, color: "#795548" },
    { name: "Buildings", count: 76, percentage: 8, color: "#607d8b" },
  ]

  // Monthly data
  monthlyData: MonthlyData[] = [
    { month: "Jan", uploads: 45, views: 1200 },
    { month: "Feb", uploads: 52, views: 1450 },
    { month: "Mar", uploads: 78, views: 2100 },
    { month: "Apr", uploads: 110, views: 3200 },
    { month: "May", uploads: 95, views: 2800 },
    { month: "Jun", uploads: 86, views: 2500 },
    { month: "Jul", uploads: 105, views: 3100 },
    { month: "Aug", uploads: 120, views: 3500 },
    { month: "Sep", uploads: 90, views: 2700 },
    { month: "Oct", uploads: 72, views: 2200 },
    { month: "Nov", uploads: 85, views: 2600 },
    { month: "Dec", uploads: 95, views: 2900 },
  ]

  // Top users
  topUsers: UserStat[] = [
    { name: "Emma Johnson", uploads: 45, avatar: "assets/avatar1.jpg" },
    { name: "Michael Smith", uploads: 38, avatar: "assets/avatar2.jpg" },
    { name: "Sophia Williams", uploads: 32, avatar: "assets/avatar3.jpg" },
    { name: "James Brown", uploads: 29, avatar: "assets/avatar4.jpg" },
    { name: "Olivia Davis", uploads: 24, avatar: "assets/avatar5.jpg" },
  ]

  // Summary stats
  totalDrawings = 983
  totalUsers = 256
  totalViews = 28500
  totalLikes = 12450

  // Date range
  startDate = new Date(new Date().getFullYear(), 0, 1) // Jan 1 of current year
  endDate = new Date()

  constructor() {}

  ngOnInit() {
    // In a real app, you would fetch data from a service
  }

  updateDateRange(event: any) {
    // In a real app, you would fetch new data based on the date range
    console.log("Date range updated:", event)
  }
}
