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
import { MatCardTitle}from "@angular/material/card"
import { MatCardActions} from "@angular/material/card"
import { MatCardSubtitle, MatCardHeader } from "@angular/material/card"
import { UserService } from "../../../services/userManagment/user.service"
import { User } from "../../../Models/User"



// export interface User {
//   id: string
//   name: string
//   email: string
//   role: string
//   status: string
//   createdAt: string
//   lastLogin: string
// }

@Component({
  selector: 'app-user',
  imports: [MatIcon, MatCard, MatCardContent, MatPaginator, MatCardTitle,
     MatCardActions, MatCardSubtitle, MatCardHeader],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  displayedColumns: string[] = ["id", "name", "email", "role", "status", "createdAt", "lastLogin", "actions"]
  dataSource = new MatTableDataSource<User>()

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  users: User[] = []


  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users
    })
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
          id: (this.dataSource.data.length + 1).toString(),
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          password: result.password,
          token: result.token,
        }

        this.userService.addUser(newUser)
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
        this.userService.updateUser(user.id, result)
      }
    })
  }

  deleteUser(user: User) {
    console.log("user",user, user.id,"deleteUser");
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "1000px",
      data: {
        title: "Delete User",
        message: `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
        confirmText: "Delete",
        cancelText: "Cancel",
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(user.id)
      }
    })
  }
}
