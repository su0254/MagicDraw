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
import { MatCardTitle}from "@angular/material/card"
import { MatCardActions} from "@angular/material/card"
import { MatCardSubtitle, MatCardHeader } from "@angular/material/card"
import { UserService } from "../../../services/userManagment/user.service"
import { User } from "../../../Models/User"
import { Observable } from "rxjs"
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [MatIcon, MatCard, MatPaginator, MatCardTitle,
     MatCardActions, MatCardSubtitle, MatCardHeader, AsyncPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {


  users$: Observable<User[]> | undefined

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe(() => {
      this.users$ = this.userService.users$
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
  }

  addUser() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: "500px",
      data: { title: "Add User", user: {} },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // In a real app, you would call a service to add the user
        const newUser = {
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          password: result.password,
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
        console.log("result", result);
        this.userService.deleteUser(user.id)
      }
    })
  }
}
