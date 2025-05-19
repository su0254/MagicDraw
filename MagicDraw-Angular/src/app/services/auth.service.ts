import { Injectable } from "@angular/core"
import type { HttpClient } from "@angular/common/http"
import { BehaviorSubject, type Observable, of } from "rxjs"
import { tap, catchError } from "rxjs/operators"
import { environment } from "../../environments/environment"
import type { User } from "../models/user.model"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null)
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false)

  currentUser$ = this.currentUserSubject.asObservable()
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable()

  constructor(private http: HttpClient) {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      this.currentUserSubject.next(user)
      this.isAuthenticatedSubject.next(true)
    }
  }

  login(email: string, password: string): Observable<User> {
    // Replace with your actual API endpoint
    return this.http.post<User>(`${environment.apiUrl}/auth/login`, { email, password }).pipe(
      tap((user) => {
        localStorage.setItem("currentUser", JSON.stringify(user))
        this.currentUserSubject.next(user)
        this.isAuthenticatedSubject.next(true)
      }),
      catchError((error) => {
        console.error("Login error:", error)
        return of(null as unknown as User)
      }),
    )
  }

  logout(): void {
    localStorage.removeItem("currentUser")
    this.currentUserSubject.next(null)
    this.isAuthenticatedSubject.next(false)
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value
  }
}
