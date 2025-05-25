import { Component, OnInit, ViewChild } from "@angular/core"
import { MatTableDataSource } from "@angular/material/table"
import { MatPaginator } from "@angular/material/paginator"
import { MatSort } from "@angular/material/sort"
import { MatDialog } from "@angular/material/dialog"
import { MatSnackBar } from "@angular/material/snack-bar"
import { UserDialogComponent } from "./user-dialog/user-dialog/user-dialog.component"
import { ConfirmDialogComponent } from "../../../shareds/confirm-dialog/confirm-dialog/confirm-dialog.component"
import { MatIcon } from "@angular/material/icon"
import { MatCard } from "@angular/material/card"
import { MatCardContent } from "@angular/material/card"
import { MatFormField } from "@angular/material/form-field"
import { MatLabel } from "@angular/material/form-field"

export interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  createdAt: string
  lastLogin: string
}

@Component({
  selector: "app-users",
  imports: [MatIcon, MatCard, MatCardContent, MatFormField, MatLabel
, MatPaginator, MatSort],
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "email", "role", "status", "createdAt", "lastLogin", "actions"]
  dataSource = new MatTableDataSource<User>()

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    // Mock data
    const users: User[] = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        status: "Active",
        createdAt: "2023-01-15",
        lastLogin: "2023-04-20",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "User",
        status: "Active",
        createdAt: "2023-02-10",
        lastLogin: "2023-04-18",
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "User",
        status: "Inactive",
        createdAt: "2023-02-15",
        lastLogin: "2023-03-05",
      },
      {
        id: 4,
        name: "Alice Brown",
        email: "alice@example.com",
        role: "Moderator",
        status: "Active",
        createdAt: "2023-03-01",
        lastLogin: "2023-04-19",
      },
      {
        id: 5,
        name: "Charlie Wilson",
        email: "charlie@example.com",
        role: "User",
        status: "Active",
        createdAt: "2023-03-10",
        lastLogin: "2023-04-15",
      },
      {
        id: 6,
        name: "Diana Miller",
        email: "diana@example.com",
        role: "User",
        status: "Active",
        createdAt: "2023-03-15",
        lastLogin: "2023-04-17",
      },
      {
        id: 7,
        name: "Edward Davis",
        email: "edward@example.com",
        role: "User",
        status: "Inactive",
        createdAt: "2023-03-20",
        lastLogin: "2023-04-01",
      },
      {
        id: 8,
        name: "Fiona Clark",
        email: "fiona@example.com",
        role: "Moderator",
        status: "Active",
        createdAt: "2023-03-25",
        lastLogin: "2023-04-16",
      },
      {
        id: 9,
        name: "George White",
        email: "george@example.com",
        role: "User",
        status: "Active",
        createdAt: "2023-04-01",
        lastLogin: "2023-04-18",
      },
      {
        id: 10,
        name: "Hannah Lee",
        email: "hannah@example.com",
        role: "User",
        status: "Active",
        createdAt: "2023-04-05",
        lastLogin: "2023-04-19",
      },
    ]

    this.dataSource.data = users
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  addUser() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: "500px",
      data: { title: "Add User", user: {} },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // In a real app, you would call a service to add the user
        const newUser: User = {
          id: this.dataSource.data.length + 1,
          name: result.name,
          email: result.email,
          role: result.role,
          status: "Active",
          createdAt: new Date().toISOString().split("T")[0],
          lastLogin: "-",
        }

        this.dataSource.data = [...this.dataSource.data, newUser]
        this.snackBar.open("User added successfully", "Close", { duration: 3000 })
      }
    })
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: "500px",
      data: { title: "Edit User", user: { ...user } },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // In a real app, you would call a service to update the user
        const updatedUsers = this.dataSource.data.map((u) =>
          u.id === user.id ? { ...u, name: result.name, email: result.email, role: result.role } : u,
        )

        this.dataSource.data = updatedUsers
        this.snackBar.open("User updated successfully", "Close", { duration: 3000 })
      }
    })
  }

  deleteUser(user: User) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Delete User",
        message: `Are you sure you want to delete ${user.name}?`,
        confirmText: "Delete",
        cancelText: "Cancel",
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // In a real app, you would call a service to delete the user
        this.dataSource.data = this.dataSource.data.filter((u) => u.id !== user.id)
        this.snackBar.open("User deleted successfully", "Close", { duration: 3000 })
      }
    })
  }
}
