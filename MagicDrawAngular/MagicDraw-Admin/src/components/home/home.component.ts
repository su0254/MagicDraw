import { Component } from "@angular/core"
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from "@angular/material/icon";
import { MatNavList } from "@angular/material/list";
import { MatDivider } from "@angular/material/list";
import { MatCard } from "@angular/material/card";
import { MatCardHeader } from "@angular/material/card";
import { MatCardContent } from "@angular/material/card";
import { MatCardActions } from "@angular/material/card";
import { MatCardTitle } from "@angular/material/card";
import { MatList } from "@angular/material/list";
import { MatListItem } from "@angular/material/list";
import { MatProgressBar } from "@angular/material/progress-bar";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../../shareds/header/header/header.component";
import { FooterComponent } from "../../shareds/footer/footer/footer.component";
import { ChartType } from 'chart.js';

interface StatCard {
  title: string
  value: number
  icon: string
  color: string
}

interface RecentActivity {
  id: number
  action: string
  user: string
  time: string
  icon: string
}

@Component({
  selector: "app-home",
  imports: [MatSidenavModule, MatIcon, MatNavList, MatDivider, HeaderComponent
    , MatCard, MatCardHeader, MatCardContent, MatCardActions, MatCardTitle
  , MatList, MatListItem, FooterComponent, CommonModule],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  
})
export class HomeComponent {
  sidenavOpened = true

    // נתוני הקטגוריות
  popularCategories = [
    { name: "Animals", count: 1245 },
    { name: "Nature", count: 982 },
    { name: "Fantasy", count: 753 },
    { name: "Space", count: 621 },
    { name: "Vehicles", count: 489 },
  ];

  // נתוני הגרף
  public barChartLabels: string[] = this.popularCategories.map(c => c.name);
  public barChartData: number[] = this.popularCategories.map(c => c.count);
  public barChartType: ChartType = 'bar';

  statCards: StatCard[] = [
    { title: "Total Users", value: 1254, icon: "people", color: "#3f51b5" },
    { title: "Total Drawings", value: 5782, icon: "image", color: "#f44336" },
    { title: "Categories", value: 24, icon: "category", color: "#4caf50" },
    { title: "Daily Active Users", value: 342, icon: "trending_up", color: "#ff9800" },
  ]

  recentActivities: RecentActivity[] = [
    { id: 1, action: "New drawing uploaded", user: "Emma Johnson", time: "5 minutes ago", icon: "add_photo_alternate" },
    { id: 2, action: "User registered", user: "Michael Smith", time: "10 minutes ago", icon: "person_add" },
    { id: 3, action: "Category created", user: "Admin", time: "1 hour ago", icon: "create_new_folder" },
    { id: 4, action: "Drawing approved", user: "Admin", time: "2 hours ago", icon: "check_circle" },
    { id: 5, action: "User updated profile", user: "Sophia Williams", time: "3 hours ago", icon: "edit" },
  ]

  // popularCategories = [
  //   { name: "Animals", count: 1245, percentage: 85 },
  //   { name: "Nature", count: 982, percentage: 70 },
  //   { name: "Fantasy", count: 753, percentage: 55 },
  //   { name: "Space", count: 621, percentage: 45 },
  //   { name: "Vehicles", count: 489, percentage: 35 },
  // ]

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened
  }
}
