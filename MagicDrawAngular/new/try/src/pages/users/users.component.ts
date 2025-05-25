import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core"
import { MatTableDataSource } from "@angular/material/table"
import { MatSort, MatSortModule } from "@angular/material/sort"
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatChipsModule } from "@angular/material/chips"
import { MatMenuModule } from "@angular/material/menu"
import { MatDividerModule } from "@angular/material/divider"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatTooltipModule } from "@angular/material/tooltip"
import { FormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { MatTableModule } from "@angular/material/table"
import { UserService } from "../../services/user.service"
import { User } from "../../models/user.model"

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ["user", "status", "role", "drawings", "lastActive", "actions"]
  dataSource = new MatTableDataSource<User>([])
  loading = true
  searchTerm = ""

  @ViewChild(MatSort) sort: MatSort|undefined
  @ViewChild(MatPaginator) paginator: MatPaginator|undefined

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort ?? null
    this.dataSource.paginator = this.paginator ?? null
  }

  loadUsers(): void {
    this.loading = true
    this.userService.getUsers().subscribe(
      (users) => {
        this.dataSource.data = users
        this.loading = false
      },
      (error) => {
        console.error("Error loading users:", error)
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

  getAvatarColor(name: string): string {
    // Generate a consistent color based on the name
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    const hue = hash % 360
    return `hsl(${hue}, 70%, 60%)`
  }
}
