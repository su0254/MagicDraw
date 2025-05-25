import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../Models/User';
import { Router } from '@angular/router';
import { UserLogin } from '../../Models/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  login(user: Partial<UserLogin>) {
    this.http.post("http://localhost:5058/api/Auth/login",
      {
        email: user.user?.email ?? '',
        password: user.user?.password ?? ''
      }).subscribe({
        next: (response: Partial<UserLogin>) => {
          console.log("response", response);
          sessionStorage.setItem('token', response.token? response.token : '');
           
          localStorage.setItem('userId', response.user?.id? response.user.id : '');
          console.log("Login was succeed", response);
          console.log("userId", response.user?.id);

          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.log('Error occurred:', error); // טיפול בשגיאות
        }
      })
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }
  logout(){
    sessionStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
  }

  
}
