import { Component, type OnInit, ViewChild } from "@angular/core"
import { MatTableDataSource } from "@angular/material/table"
import { MatSort } from "@angular/material/sort"
import { MatPaginator } from "@angular/material/paginator"
import type { UserService } from "../../services/user.service"
import type { User } from "../../models/user.model"

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ["user", "status", "role", "drawings", "lastActive", "actions"]
  dataSource = new MatTableDataSource<User>([])
  loading = true
  searchTerm = ""

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
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
