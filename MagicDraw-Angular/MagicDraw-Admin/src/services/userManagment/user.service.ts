import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'; // ייבוא MatSnackBar

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<any[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  getAllUsers(): Observable<any> {
    return this.http.get<any[]>("http://localhost:5058/api/User").pipe(
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
    return this.http.get(`http://localhost:5058/api/User/${userId}`).pipe(
      tap(() => this.showMessage("משתמש נטען בהצלחה", "success")),
      catchError((error) => {
        this.showMessage("שגיאה בטעינת המשתמש", "error");
        return of(null);
      })
    );
  }

  addUser(user: any): Observable<any> {
    return this.http.post("http://localhost:5058/api/User", user).pipe(
      tap(() => {
        this.showMessage("משתמש נוסף בהצלחה", "success");
        this.refreshUsers();
      }),
      catchError((error) => {
        this.showMessage("שגיאה בהוספת משתמש", "error");
        return of(null);
      })
    );
  }

  updateUser(userId: string, user: any): Observable<any> {
    return this.http.put(`http://localhost:5058/api/User/${userId}`, user).pipe(
      tap(() => {
        this.showMessage("משתמש עודכן בהצלחה", "success");
        this.refreshUsers();
      }),
      catchError((error) => {
        this.showMessage("שגיאה בעדכון משתמש", "error");
        return of(null);
      })
    );
  }

  deleteUser(userId: string): Observable<any> {
    console.log("delete in servuce", userId);
    
    return this.http.delete(`http://localhost:5058/api/User/${userId}`).pipe(
      tap(() => {
        console.log("User was deleted");
      }),
      catchError((error) => {
        console.error('Error occurred:', error); // טיפול בשגיאות
        return of(null);
      })
    );
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