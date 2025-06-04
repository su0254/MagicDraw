import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'; // ייבוא MatSnackBar
import { LoginService } from '../LoginService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<any[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private auth: LoginService) { }

  getAllUsers(): Observable<any> {
    return this.http.get<any[]>("https://magicdrawapi.onrender.com/api/User").pipe(
      tap((users: any[]) => {

        this.usersSubject.next(users);
        this.showMessage("משתמשים נטענו בהצלחה", "success");
      }),
      catchError((error) => {
        this.showMessage("שגיאה בטעינת המשתמשים", "error");
        return of([]);
      })
    );
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get(`https://magicdrawapi.onrender.com/api/User/${userId}`).pipe(
      tap(() => this.showMessage("משתמש נטען בהצלחה", "success")),
      catchError((error) => {
        this.showMessage("שגיאה בטעינת המשתמש", "error");
        return of(null);
      })
    );
  }

  addUser(user: any) {
    console.log("user in service", user);

     this.http.post("https://magicdrawapi.onrender.com/api/User", user).subscribe(
      {
        next: (() => {
          console.log("user was added", user);
          this.showMessage("משתמש נוסף בהצלחה", "success");
          this.refreshUsers();
          
        }),
        error: (() => {
          this.showMessage("שגיאה בהוספת משתמש", "error");
          return of(null);
        })
      });
  }


  deleteUser(userId: string) {
    // const token = sessionStorage.getItem('token');
    // if(!token){
    //   return;
    // }
    // const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    console.log("delete in service", userId);

    this.http.delete(`https://magicdrawapi.onrender.com/api/User/${userId}`).subscribe({
      next: () => {
        console.log("User was deleted");
        this.showMessage("משתמש נמחק בהצלחה", "success");
        this.refreshUsers(); // רענן את רשימת המשתמשים לאחר מחיקה
      },
      error: (error) => {
        console.error('Error occurred:', error); // טיפול בשגיאות
      }
    })
  }

  private refreshUsers(): void {
    this.getAllUsers().subscribe();
  }

  private showMessage(message: string, type: "success" | "error"): void {
    this.snackBar.open(message, "סגור", {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: type === "success" ? "snackbar-success" : "snackbar-error"
    });
  }
}