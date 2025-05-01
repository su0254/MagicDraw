import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../Models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  login(user: Partial<User>) {
    this.http.post("http://localhost:5058/api/Auth/login",
      {
        email: user.email,
        password: user.password
      }).subscribe({
        next: (response: Partial<User>) => {
          console.log("response", response);
          sessionStorage.setItem('token', response.token? response.token : ''); 
          localStorage.setItem('userId', JSON.stringify(response.id));
          console.log("Login was succeed", response);
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
